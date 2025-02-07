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
  it("should hash password and updates user", async () => {
    const mockUser = { id: 1, username: "updateduser" };
    bcrypt.hash.mockResolvedValueOnce("hashedPassword123");
    usersRepository.updateUser.mockResolvedValueOnce(mockUser);
    
    const result = await updateUser(1, "updateduser", "newpassword");
    
    expect(bcrypt.hash).toHaveBeenCalledWith("newpassword", 10);
    expect(usersRepository.updateUser).toHaveBeenCalledWith(1, "updateduser", "hashedPassword123");
    expect(result).toEqual(mockUser);
  });
  
  it("should not hash password if null", async () => {
    const mockUser = { id: 1, username: "updateduser" };
    usersRepository.updateUser.mockResolvedValueOnce(mockUser);
    
    const result = await updateUser(1, "updateduser", null);
    
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(usersRepository.updateUser).toHaveBeenCalledWith(1, "updateduser", null);
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
