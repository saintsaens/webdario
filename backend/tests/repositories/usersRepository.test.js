import { vi, test, expect } from "vitest";
import db from "../../db-users/index.js";
import { createUser, getUserById, updateUser, deleteUser } from "../../repositories/usersRepository.js";

vi.mock('../../db-users/index.js', () => {
  return {
      default: { query: vi.fn() },
      query: vi.fn(),
  };
});

test("createUser inserts a user and returns id, username", async () => {
  const mockUser = { id: 1, username: "testuser", role: "user" };
  vi.mocked(db.query).mockResolvedValueOnce({ rows: [mockUser] });

  const result = await createUser("testuser", "hashedpassword", "user");

  expect(db.query).toHaveBeenCalledWith(
    expect.stringMatching(/INSERT INTO users/),
    ["testuser", "hashedpassword", "user"]
  );
  expect(result).toEqual(mockUser);
});

test("getUserById retrieves a user by ID", async () => {
  const mockUser = { id: 1, username: "testuser", role: "user" };
  vi.mocked(db.query).mockResolvedValueOnce({ rows: [mockUser] });

  const result = await getUserById(1);

  expect(db.query).toHaveBeenCalledWith(
    "SELECT id, username, role FROM users WHERE id = $1;",
    [1]
  );
  expect(result.rows[0]).toEqual(mockUser);
});

test("updateUser updates user fields and returns updated user", async () => {
  const mockUpdatedUser = { id: 1, username: "updatedUser", hashed_pw: "newhashedpassword" };
  db.query.mockResolvedValue({ rows: [mockUpdatedUser] });

  const result = await updateUser(1, "updatedUser", "newhashedpassword");

  expect(db.query).toHaveBeenCalledWith(
    expect.stringMatching(/UPDATE users/),
    ["updatedUser", "newhashedpassword", 1]
  );
  expect(result.rows[0]).toEqual(mockUpdatedUser);
});

test("deleteUser removes a user and returns deleted user", async () => {
  const mockDeletedUser = { id: 1, username: "testuser" };
  db.query.mockResolvedValue({ rows: [mockDeletedUser] });

  const result = await deleteUser(1);

  expect(db.query).toHaveBeenCalledWith(
    "DELETE FROM users WHERE id = $1 RETURNING *;",
    [1]
  );
  expect(result.rows[0]).toEqual(mockDeletedUser);
});
