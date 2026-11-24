import { expect, test } from "@playwright/test";

for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560]) {
  test(`la portada es navegable a ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Jefferson");
    await expect(page.locator(".hero-role")).toContainText("Analista de Datos BI | Automatización de Procesos | Reporting & Data Analytics | Data Engineering");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (width <= 850) await page.getByRole("button", { name: "Abrir menú" }).click();
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Experiencia", exact: true }).click();
    await expect(page).toHaveURL(/#experiencia$/);
    await page.locator("#experiencia summary").nth(1).click();
    await expect(page.locator("#experiencia details").nth(1)).toHaveAttribute("open", "");
    expect(errors).toEqual([]);
    if (width === 390 || width === 1440) {
      await page.goto("/");
      await page.screenshot({ path: `docs/capturas/portafolio-${width}.png`, fullPage: true });
    }
  });
}

test("los tres casos de estudio, el PDF y los enlaces de contacto están disponibles", async ({ page, request }) => {
  await page.goto("/");
  const cases = page.getByRole("link", { name: /Ver caso de estudio/ });
  await expect(cases).toHaveCount(3);
  for (const href of await cases.evaluateAll(links => links.map(link => (link as HTMLAnchorElement).href))) {
    await page.goto(href);
    await expect(page.getByRole("heading", { name: "Mi contribución" })).toBeVisible();
    await page.getByRole("link", { name: "Volver a proyectos" }).click();
    await expect(page).toHaveURL(/#proyectos$/);
  }
  await expect(page.getByRole("link", { name: "Contáctame por WhatsApp" })).toHaveAttribute("href", /^https:\/\/wa.me\//);
  await expect(page.getByRole("link", { name: "Descargar" })).toHaveAttribute("download");
  const pdf = await request.get("/cv-jefferson-zambrano.pdf");
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
});

test("el movimiento reducido conserva la vista estática y los controles de teclado funcionan", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 850 });
  await page.goto("/");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Saltar al contenido" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Inicio" }).focus();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
});

test("la vista 3D se activa en escritorio y el usuario puede pausarla", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible({ timeout: 15000 });
  await page.screenshot({ path: "docs/capturas/hero-3d.png" });
  await page.evaluate(() => window.scrollTo({ top: 135, behavior: "instant" }));
  await expect(page.locator("canvas")).toBeVisible();
  await page.screenshot({ path: "docs/capturas/hero-3d-scroll.png" });
  await page.getByRole("button", { name: "Pausar 3D" }).click();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Explorar en 3D" }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.locator("#experiencia").scrollIntoViewIfNeeded();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.keyboard.press("Home");
  await expect(page.locator("canvas")).toBeVisible();
});

test("el recorrido por scroll separa y gira los paneles", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator("#metodo").scrollIntoViewIfNeeded();
  const runway = page.locator(".split-card-runway");
  await expect(runway).toBeAttached();
  const progress = async (portion: number) => runway.evaluate((item, value) => {
    const start = item.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: start + (item.clientHeight - window.innerHeight) * value, behavior: "instant" });
  }, portion);
  const first = page.locator(".split-card-panel").first();
  await progress(0);
  const face = () => first.evaluate(el => {
    const transform = getComputedStyle(el).transform;
    return transform === "none" ? 1 : new DOMMatrix(transform).m11;
  });
  const separation = () => first.evaluate(el => {
    const transform = getComputedStyle(el).transform;
    return transform === "none" ? 0 : new DOMMatrix(transform).m41;
  });
  await expect.poll(face).toBeGreaterThan(.95);
  const stickyTop = await page.locator(".split-card-sticky").evaluate(el => el.getBoundingClientRect().top);
  await page.screenshot({ path: "docs/capturas/scroll-split-inicio.png" });
  await progress(.36);
  await expect.poll(separation).toBeLessThan(-18);
  expect(await page.locator(".split-card-sticky").evaluate(el => el.getBoundingClientRect().top)).toBeCloseTo(stickyTop, 0);
  await page.screenshot({ path: "docs/capturas/scroll-split-separacion.png" });
  await progress(.82);
  await expect.poll(face).toBeLessThan(-.8);
  await page.screenshot({ path: "docs/capturas/scroll-split-card.png" });
  await progress(.59);
  await expect.poll(face).toBeGreaterThan(-.6);
  await progress(0);
  await expect.poll(face).toBeGreaterThan(.95);
  await progress(.95);
  await expect.poll(face).toBeLessThan(-.8);
  await expect.poll(() => page.locator(".split-card-outro").evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(.65);
});

test("móvil táctil y escritorio con movimiento reducido muestran los tres pasos sin fijar el scroll", async ({ browser, baseURL }) => {
  for (const options of [
    { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" as const },
  ]) {
    const context = await browser.newContext({ ...options, baseURL });
    const page = await context.newPage();
    try {
      await page.goto("/");
      await page.locator("#metodo").scrollIntoViewIfNeeded();
      await expect(page.locator(".split-card-runway")).toHaveCount(0);
      await expect(page.locator("canvas")).toHaveCount(0);
      await expect(page.locator("#metodo h3")).toHaveText(["Captura", "Validación", "Visualización"]);
      expect(await page.locator(".process-heading").evaluate(el => getComputedStyle(el).position)).toBe("static");
    } finally {
      await context.close();
    }
  }
});

test("la formación incluye el título profesional y todos los cursos registrados", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#formacion");
  await expect(section.getByRole("heading", { name: "Tecnólogo en Gestión Administrativa" })).toBeVisible();
  await expect(section.getByRole("heading", { level: 4 })).toHaveCount(12);
  await expect(section.getByRole("heading", { name: "Técnico en Información Turística Local" })).toBeVisible();
  await expect(section.getByRole("heading", { name: "Power Automate" })).toBeVisible();
  await expect(section.getByRole("heading", { name: "n8n + MCP: Automatización y agentes de IA" })).toBeVisible();
  await expect(section.getByText(/Harness Engineering/)).toBeVisible();
});

test("el tablero gira al desplazarse y termina en una vista nítida", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const stage = page.locator(".dashboard-stage");
  const device = page.locator(".dashboard-device");
  const showDashboard = () => stage.evaluate(el => {
    const start = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: start - 80, behavior: "instant" });
  });
  const facing = () => device.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m11);
  await expect.poll(facing).toBeLessThan(.65);
  await showDashboard();
  await expect(device).toHaveCSS("transform", "none");
  await expect(page.locator(".device-face")).toHaveCSS("backface-visibility", "visible");
  await page.screenshot({ path: "docs/capturas/tablero-bi-scroll.png" });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(facing).toBeLessThan(.65);
});

test("los tres proyectos y las miniaturas caben en escritorio y móvil", async ({ page }) => {
  for (const { width, maxHeroHeight } of [
    { width: 1440, maxHeroHeight: 530 },
    { width: 390, maxHeroHeight: 605 },
    { width: 320, maxHeroHeight: 650 },
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const grid = page.locator(".project-grid");
    await expect(grid.getByRole("link")).toHaveCount(3);
    const layout = await page.evaluate(() => {
      const projects = document.querySelector(".project-grid")!;
      const cards = [...projects.querySelectorAll(".project-card")].map(card => card.getBoundingClientRect());
      return {
        gridWidth: projects.clientWidth,
        gridContentWidth: projects.scrollWidth,
        rows: new Set(cards.map(card => Math.round(card.top))).size,
        heroHeight: document.querySelector("#inicio")!.clientHeight,
        thumbnailWidth: document.querySelector(".skill-visual")!.clientWidth,
      };
    });
    expect(layout.gridContentWidth).toBe(layout.gridWidth);
    expect(layout.rows).toBe(width === 1440 ? 1 : 3);
    expect(layout.heroHeight).toBeLessThan(maxHeroHeight);
    expect(layout.thumbnailWidth).toBeLessThan(130);
    if (width !== 320) {
      await page.goto("/#proyectos");
      await expect(page.getByRole("heading", { name: "Casos de estudio" })).toBeInViewport();
      await page.screenshot({ path: `docs/capturas/proyectos-compactos-${width}.png` });
    }
  }
});
