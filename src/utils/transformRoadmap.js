export function transformRoadmap(data, formData) {
  const accents = [
    "blue",
    "green",
    "purple",
    "orange",
    "pink",
    "cyan",
  ];

  const accent =
    accents[
      Math.floor(
        Math.random() * accents.length
      )
    ];

  return {
    id:
      crypto.randomUUID?.() ??
      `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

    goal: formData.goal,

    duration: formData.duration,

    experience: formData.experience,

    difficulty: formData.difficulty,

    createdAt: new Date().toISOString(),

    status: "active",

    accent,

    currentDayIndex: 0,

    isCompleted: false,

    days: data.days.map((day, index) => ({
      ...day,

      completed: false,

      status:
        index === 0
          ? "current"
          : "locked",

      notes: "",

      tasks: day.tasks.map(
        (task, taskIndex) => ({
          id: taskIndex + 1,

          text: task,

          isCompleted: false,
        })
      ),
    })),
  };
}