"""Run with Blender: blender --background --python scripts/blender_core.py."""
import math
from pathlib import Path
import bpy

out = Path(__file__).resolve().parents[1] / "assets"
out.mkdir(exist_ok=True)

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)

def material(name, color, metallic, roughness, emission=0):
    result = bpy.data.materials.new(name)
    result.diffuse_color = (*color, 1)
    result.use_nodes = True
    shader = result.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Emission Color"].default_value = (*color, 1)
    shader.inputs["Emission Strength"].default_value = emission
    return result

bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1.34)
core = bpy.context.object
core.name = "Núcleo de datos"
core.data.materials.append(material("Zafiro", (0.03, 0.15, 0.65), 0.57, 0.23, 0.12))

for index, (radius, rotation, color) in enumerate([
    (2.18, (0.42, 0.55, 0.50), (0.02, 0.48, 1)),
    (2.40, (-0.64, 0.68, -0.54), (0.13, 0.27, 1)),
    (2.62, (0.83, -0.28, 0.20), (0.18, 0.73, 1)),
]):
    bpy.ops.mesh.primitive_torus_add(major_segments=96, minor_segments=8, major_radius=radius, minor_radius=.026, rotation=rotation)
    ring = bpy.context.object
    ring.name = f"Órbita {index + 1}"
    ring.data.materials.append(material(ring.name, color, .66, .25, .65))
    for angle in (0.35, 2.60, 4.55):
        from mathutils import Vector
        local = Vector((radius * math.cos(angle), radius * math.sin(angle), 0))
        bpy.ops.mesh.primitive_uv_sphere_add(segments=8, ring_count=8, radius=.065, location=ring.matrix_world @ local)
        bpy.context.object.data.materials.append(ring.data.materials[0])

bpy.ops.wm.save_as_mainfile(filepath=str(out / "neon-core.blend"))
bpy.ops.export_scene.gltf(filepath=str(out / "neon-core.glb"), export_format="GLB")
