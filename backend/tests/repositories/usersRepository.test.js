import { vi, test, expect, describe } from "vitest";
import db from "../../db-users/index.js";
import { createUser, getUserById, updateUser, deleteUser } from "../../repositories/usersRepository.js";

vi.mock('../../db-users/index.js', () => {
  return {
      default: { query: vi.fn() },
      query: vi.fn(),
  };
});

describe("createUser", () => {
  it("should insert a user and return id, username", async () => {
    const mockUser = { id: 1, username: "testuser", role: "user" };
    vi.mocked(db.query).mockResolvedValueOnce({ rows: [mockUser] });
  
    const result = await createUser("testuser", "hashedpassword", "user");
  
    expect(result).toEqual(mockUser);
  });
});

describe("getUserById", () => {
  it("should retrieve a user by its ID", async () => {
    const mockUser = { id: 1, username: "testuser", role: "user" };
    vi.mocked(db.query).mockResolvedValueOnce({ rows: [mockUser] });
  
    const result = await getUserById(1);
  
    expect(result).toEqual(mockUser);
  });
});

describe("updateUser", () => {
  it("should update user fields and return the updated user", async () => {
    const mockUpdatedUser = { id: 1, username: "updatedUser", hashed_pw: "newhashedpassword" };
    db.query.mockResolvedValue({ rows: [mockUpdatedUser] });
  
    const result = await updateUser(1, "updatedUser", "newhashedpassword");
  
    expect(result).toEqual(mockUpdatedUser);
  });
});

describe("deleteUser", () => {
  it("should delete a user and return its former", async () => {
    const mockDeletedUser = { id: 1, username: "testuser" };
    db.query.mockResolvedValue({ rows: [mockDeletedUser] });
  
    const result = await deleteUser(1);
  
    expect(result).toEqual(mockDeletedUser);
  });
});
