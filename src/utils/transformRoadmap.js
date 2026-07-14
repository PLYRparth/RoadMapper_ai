export function transformRoadmap(data, formData) {
  return {
    id:
      crypto.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,

    goal: formData.goal,

    duration: formData.duration,

    experience: formData.experience,

    difficulty: formData.difficulty,

    createdAt: new Date().toISOString(),

    currentDayIndex: 0,

    isCompleted: false,

    days: data.days.map((day) => ({
      ...day,

      isCompleted: false,

      notes: "",

      tasks: day.tasks.map((task, index) => ({
        id: index + 1,
        text: task,
        isCompleted: false,
      })),
    })),
  };
}