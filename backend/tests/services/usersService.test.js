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

const mockUsername = "testuser";
const mockHashedPassword = "hashedpassword123";

vi.mock("bcrypt", () => ({
    default: {
        hash: vi.fn(() => Promise.resolve(mockHashedPassword)),
    }
}));

describe("createUser", () => {
  
  it("should throw an error if username is missing", async () => {
    await expect(createUser(null, mockHashedPassword)).rejects.toThrow("Username and password are required");
  });
  
  it("should throw an error if password is missing", async () => {
    await expect(createUser(mockUsername, null)).rejects.toThrow("Username and password are required");
  });
  
  it("should throw an error if both username and password are missing", async () => {
    await expect(createUser(null, null)).rejects.toThrow("Username and password are required");
  });

  it("should not throw any error if both username and password are provided", async () => {
    const mockUser = { id: 1, username: "testuser" };
    usersRepository.createUser.mockResolvedValueOnce(mockUser);

    const result = await createUser(mockUsername, mockHashedPassword);

    expect(result).toEqual(mockUser);
  });
});

describe("getUserById", () => {
  it("should fetch a user and return its properties", async () => {
    const mockUser = { id: 1, username: "testuser" };
    usersRepository.getUserById.mockResolvedValueOnce(mockUser);
  
    const result = await getUserById(1);
  
    expect(usersRepository.getUserById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });
});

describe("updateUser", () => {
  it("should hash password and update user", async () => {
    const mockUser = { id: 1, username: "updateduser", role: "user", session_start_time: "2025-02-10T10:00:00Z", last_activity_time: "2025-02-10T10:00:00Z" };
    bcrypt.hash.mockResolvedValueOnce("hashedPassword123");
    usersRepository.updateUser.mockResolvedValueOnce(mockUser);

    const result = await updateUser(1, {
      username: "updateduser",
      password: "newpassword",
      role: "user",
      sessionStartTime: "2025-02-10T10:00:00Z",
      lastActivityTime: "2025-02-10T10:00:00Z",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("newpassword", 10);
    expect(usersRepository.updateUser).toHaveBeenCalledWith(1, {
      username: "updateduser",
      hashedPw: "hashedPassword123",
      role: "user",
      sessionStartTime: "2025-02-10T10:00:00Z",
      lastActivityTime: "2025-02-10T10:00:00Z",
    });
    expect(result).toEqual(mockUser);
  });

  it("should not hash password if password is null", async () => {
    const mockUser = { id: 1, username: "updateduser", role: "user", session_start_time: "2025-02-10T10:00:00Z", last_activity_time: "2025-02-10T10:00:00Z" };
    usersRepository.updateUser.mockResolvedValueOnce(mockUser);

    const result = await updateUser(1, {
      username: "updateduser",
      password: null,
      role: "user",
      sessionStartTime: "2025-02-10T10:00:00Z",
      lastActivityTime: "2025-02-10T10:00:00Z",
    });

    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(usersRepository.updateUser).toHaveBeenCalledWith(1, {
      username: "updateduser",
      hashedPw: null,
      role: "user",
      sessionStartTime: "2025-02-10T10:00:00Z",
      lastActivityTime: "2025-02-10T10:00:00Z",
    });
    expect(result).toEqual(mockUser);
  });
});

describe("deleteUser", () => {
  it("should remove a user and return its former properties", async () => {
    const mockUser = { id: 1, username: "deleteduser" };
    usersRepository.deleteUser.mockResolvedValueOnce(mockUser);
  
    const result = await deleteUser(1);
  
    expect(usersRepository.deleteUser).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });
});
