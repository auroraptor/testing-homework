it("Проверяет наличие переменной окружения BUG_ID", () => {
  expect(typeof process.env.BUG_ID).toBe("string");
});
