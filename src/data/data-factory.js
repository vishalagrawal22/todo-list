export function ProjectDataFactory(name = "", isDefault = false) {
  return { name, isDefault };
}

export function ProjectFactory(id = null, name = "", isDefault = false) {
  return { id, data: ProjectDataFactory(name, isDefault) };
}
