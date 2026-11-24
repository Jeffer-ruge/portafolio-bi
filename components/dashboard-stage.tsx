import { Activity, BarChart3, Database, Workflow } from "lucide-react";

const series = [26, 38, 33, 56, 48, 64, 58, 74, 63, 80, 72, 92];

export function DashboardStage() {
  return (
    <section className="dashboard-stage" aria-labelledby="dashboard-title">
      <div className="dashboard-pin shell">
        <div className="dashboard-halo" aria-hidden="true" />
        <div className="dashboard-copy">
          <p className="eyebrow">Demostración de BI</p>
          <h2 id="dashboard-title">Tablero operativo<span className="accent">.</span></h2>
          <p>Registros, validaciones y pendientes en una sola vista.</p>
        </div>
        <figure className="dashboard-device" aria-label="Ejemplo de tablero operativo con datos ficticios">
          <div className="device-back" aria-hidden="true"><BarChart3 size={64} /></div>
          <div className="device-face" aria-hidden="true">
            <div className="device-rail"><BarChart3 /><Activity /><Database /><Workflow /></div>
            <div className="device-screen">
              <div className="device-heading"><strong>Resumen operativo</strong><span>Datos de ejemplo</span></div>
              <div className="device-stats">
                <div><span>Registros</span><strong>240</strong></div>
                <div><span>Validados</span><strong>216</strong></div>
                <div><span>Pendientes</span><strong>24</strong></div>
              </div>
              <div className="device-chart">
                <span>Registros por periodo</span>
                <div className="device-bars">{series.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
