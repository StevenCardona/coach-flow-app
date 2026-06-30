export const planHistoryKeys = {
  all: ["plan-histories"] as const,
  lists: () => [...planHistoryKeys.all, "list"] as const,
  list: (studentId: string) =>
    [...planHistoryKeys.lists(), studentId] as const,
};
