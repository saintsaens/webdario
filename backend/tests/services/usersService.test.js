import { vi, test, expect } from "vitest";
import bcrypt from "bcrypt";
import * as usersRepository from "../../repositories/usersRepository.js";
import { createUser, getUserById, updateUser, deleteUser } from "../../services/usersService.js";

// Mock usersRepository and bcrypt
vi.mock("../../repositories/usersRepository.js", () => ({
  createUser: vi.fn(),
  getUserById: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}));

vi.mock("bcrypt", () => ({
    default: {
        hash: vi.fn(),
    }
}));

test("createUser calls repository and returns rows", async () => {
  const mockUser = { id: 1, username: "testuser" };
  usersRepository.createUser.mockResolvedValueOnce({ rows: [mockUser] });

  const result = await createUser("testuser", "hashedpassword");

  expect(usersRepository.createUser).toHaveBeenCalledWith("testuser", "hashedpassword", "user");
  expect(result).toEqual([mockUser]);
});

test("getUserById fetches a user and returns first row", async () => {
  const mockUser = { id: 1, username: "testuser" };
  usersRepository.getUserById.mockResolvedValueOnce({ rows: [mockUser] });

  const result = await getUserById(1);

  expect(usersRepository.getUserById).toHaveBeenCalledWith(1);
  expect(result).toEqual(mockUser);
});

test("updateUser hashes password and updates user", async () => {
  const mockUser = { id: 1, username: "updateduser" };
  bcrypt.hash.mockResolvedValueOnce("hashedPassword123");
  usersRepository.updateUser.mockResolvedValueOnce({ rows: [mockUser] });

  const result = await updateUser(1, "updateduser", "newpassword");

  expect(bcrypt.hash).toHaveBeenCalledWith("newpassword", 10);
  expect(usersRepository.updateUser).toHaveBeenCalledWith(1, "updateduser", "hashedPassword123");
  expect(result).toEqual(mockUser);
});

test("updateUser does not hash password if null", async () => {
  const mockUser = { id: 1, username: "updateduser" };
  usersRepository.updateUser.mockResolvedValueOnce({ rows: [mockUser] });

  const result = await updateUser(1, "updateduser", null);

  expect(bcrypt.hash).not.toHaveBeenCalled();
  expect(usersRepository.updateUser).toHaveBeenCalledWith(1, "updateduser", null);
  expect(result).toEqual(mockUser);
});

test("deleteUser removes a user and returns first row", async () => {
  const mockUser = { id: 1, username: "deleteduser" };
  usersRepository.deleteUser.mockResolvedValueOnce({ rows: [mockUser] });

  const result = await deleteUser(1);

  expect(usersRepository.deleteUser).toHaveBeenCalledWith(1);
  expect(result).toEqual(mockUser);
});
