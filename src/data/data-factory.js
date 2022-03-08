export function ProjectDataFactory(name = "", isDefault = false) {
  return { name, isDefault };
}

export function ProjectFactory(id = null, name = "", isDefault = false) {
  return { id, data: ProjectDataFactory(name, isDefault) };
}

export function TodoDataFactory(
  parentProjectId = null,
  title,
  description,
  deadline,
  priority,
  isCompleted = false
) {
  return {
    title,
    description,
    deadline,
    isCompleted,
    priority,
    parentProjectId,
  };
}

export function TodoFactory(
  id = null,
  parentProjectId = null,
  title,
  description,
  deadline,
  priority,
  isCompleted = false
) {
  return {
    id,
    data: TodoDataFactory(
      parentProjectId,
      title,
      description,
      deadline,
      priority,
      isCompleted
    ),
  };
}
