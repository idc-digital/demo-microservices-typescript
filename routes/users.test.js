test("fetchData returns the correct data", () => {
  const data = fetchData();
  expect(data).toEqual(
    JSON.stringify({
      name: "Jon Snow",
      age: 30,
    })
  );
});