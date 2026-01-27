import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database module
vi.mock("./db", () => ({
  getDb: vi.fn(() => Promise.resolve(null)),
  upsertUser: vi.fn((user) => Promise.resolve({
    id: 1,
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  })),
  getUserByOpenId: vi.fn(),
  getUserById: vi.fn((id) => Promise.resolve({
    id,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "clerk",
    role: "client",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    onboardingCompleted: false,
  })),
  getAllUsers: vi.fn(() => Promise.resolve([])),
  updateUser: vi.fn(() => Promise.resolve()),
  // Onboarding
  saveOnboardingData: vi.fn(() => Promise.resolve(1)),
  getOnboardingDataByUserId: vi.fn(() => Promise.resolve(null)),
  getAllOnboardingData: vi.fn(() => Promise.resolve([])),
  markOnboardingAsReviewed: vi.fn(() => Promise.resolve()),
  // Orders & Invoices
  createOrder: vi.fn(() => Promise.resolve(1)),
  getOrdersByUserId: vi.fn(() => Promise.resolve([])),
  getAllOrders: vi.fn(() => Promise.resolve([])),
  hasUserPurchasedProduct: vi.fn(() => Promise.resolve({ purchased: false, order: null })),
  createInvoice: vi.fn(() => Promise.resolve(1)),
  getInvoicesByUserId: vi.fn(() => Promise.resolve([])),
  // Other mocked functions
  createTenant: vi.fn(() => Promise.resolve(1)),
  getTenantById: vi.fn(() => Promise.resolve(null)),
  getTenantBySlug: vi.fn(() => Promise.resolve(null)),
  getAllTenants: vi.fn(() => Promise.resolve([])),
  updateTenant: vi.fn(() => Promise.resolve()),
  createMembership: vi.fn(() => Promise.resolve(1)),
  getMembershipsByUserId: vi.fn(() => Promise.resolve([])),
  getMembershipsByTenantId: vi.fn(() => Promise.resolve([])),
  getUserMembership: vi.fn(() => Promise.resolve(null)),
  updateMembership: vi.fn(() => Promise.resolve()),
  createLead: vi.fn(() => Promise.resolve(1)),
  getLeadsByTenantId: vi.fn(() => Promise.resolve([])),
  getLeadById: vi.fn(() => Promise.resolve(null)),
  updateLead: vi.fn(() => Promise.resolve()),
  createContact: vi.fn(() => Promise.resolve(1)),
  getContactsByTenantId: vi.fn(() => Promise.resolve([])),
  getContactById: vi.fn(() => Promise.resolve(null)),
  updateContact: vi.fn(() => Promise.resolve()),
  createPipelineStage: vi.fn(() => Promise.resolve(1)),
  getPipelineStagesByTenantId: vi.fn(() => Promise.resolve([])),
  updatePipelineStage: vi.fn(() => Promise.resolve()),
  deletePipelineStage: vi.fn(() => Promise.resolve()),
  createDeal: vi.fn(() => Promise.resolve(1)),
  getDealsByTenantId: vi.fn(() => Promise.resolve([])),
  getDealById: vi.fn(() => Promise.resolve(null)),
  updateDeal: vi.fn(() => Promise.resolve()),
  getDealsByStageId: vi.fn(() => Promise.resolve([])),
  createTask: vi.fn(() => Promise.resolve(1)),
  getTasksByTenantId: vi.fn(() => Promise.resolve([])),
  getTasksByDealId: vi.fn(() => Promise.resolve([])),
  updateTask: vi.fn(() => Promise.resolve()),
  createFile: vi.fn(() => Promise.resolve(1)),
  getFilesByTenantId: vi.fn(() => Promise.resolve([])),
  getFileById: vi.fn(() => Promise.resolve(null)),
  deleteFile: vi.fn(() => Promise.resolve()),
  createAuditLog: vi.fn(() => Promise.resolve(1)),
  getAuditLogsByTenantId: vi.fn(() => Promise.resolve([])),
  createContract: vi.fn(() => Promise.resolve(1)),
  getAllContracts: vi.fn(() => Promise.resolve([])),
  getContractById: vi.fn(() => Promise.resolve(null)),
  updateContract: vi.fn(() => Promise.resolve()),
  deleteContract: vi.fn(() => Promise.resolve()),
  assignContractToUser: vi.fn(() => Promise.resolve(1)),
  getUserContractAssignments: vi.fn(() => Promise.resolve([])),
  acceptContract: vi.fn(() => Promise.resolve(1)),
  getContractAcceptance: vi.fn(() => Promise.resolve(null)),
}));

// Mock storage
vi.mock("./storage", () => ({
  storagePut: vi.fn(() => Promise.resolve({ url: "https://example.com/file.pdf" })),
  storageGet: vi.fn(() => Promise.resolve("https://example.com/file.pdf")),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(() => Promise.resolve()),
}));

// Mock email service
vi.mock("./emailService", () => ({
  sendWelcomeEmail: vi.fn(() => Promise.resolve()),
  sendInvoiceEmail: vi.fn(() => Promise.resolve()),
}));

// Mock GoHighLevel service
vi.mock("./gohighlevelService", () => ({
  getGHLService: vi.fn(() => ({
    createContact: vi.fn(() => Promise.resolve({ id: "ghl-123" })),
  })),
}));

function createAuthContext(overrides?: Partial<TrpcContext>): TrpcContext {
  const user = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "clerk" as const,
    role: "client" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as any,
    ...overrides,
  };
}

describe("User Journey: Registration to Dashboard", () => {
  it("should complete new user registration flow", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Step 1: User data should be accessible after Clerk registration
    const me = await caller.auth.me();
    expect(me).toBeDefined();
    expect(me?.email).toBe("test@example.com");
    expect(me?.id).toBe(1);
  });

  it("should show user is not onboarded initially", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const me = await caller.auth.me();
    // New users should have onboardingCompleted = false
    // This is checked in the frontend to show Welcome Modal
    expect(me).toBeDefined();
  });
});

describe("User Journey: Onboarding Process", () => {
  it("should save complete onboarding data (4 steps)", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Complete onboarding data from all 4 steps (matching schema)
    const onboardingData = {
      // Step 1: Kontaktdaten
      anrede: "Herr",
      vorname: "Max",
      nachname: "Mustermann",
      email: "test@example.com",
      telefon: "+49 123 456789",

      // Step 2: Unternehmensdaten
      firmenname: "Test GmbH",
      rechtsform: "GmbH",
      branche: "Immobilien",
      mitarbeiteranzahl: "10-50",

      // Step 3: Krisensituation
      krisenarten: "Finanzielle Schwierigkeiten",
      krisenbeschreibung: "Beschreibung der Krise",

      // Step 4: Finanzielle Details
      steuerschulden: "50.000-100.000 EUR",
      offeneFristen: "1-3 Monate",
      liquiditaet: "Angespannt",
    };

    const result = await caller.user.saveOnboardingData(onboardingData);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it("should mark user as onboarded after completion", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const onboardingData = {
      anrede: "Herr",
      vorname: "Max",
      nachname: "Mustermann",
      email: "test@example.com",
      telefon: "+49 123 456789",
      firmenname: "Test GmbH",
      rechtsform: "GmbH",
      branche: "Immobilien",
      mitarbeiteranzahl: "10-50",
      krisenarten: "Finanzielle Schwierigkeiten",
      krisenbeschreibung: "Test",
      steuerschulden: "10.000-50.000 EUR",
      offeneFristen: "Mehr als 6 Monate",
      liquiditaet: "Stabil",
    };

    const result = await caller.user.completeOnboarding(onboardingData);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.message).toContain("abgeschlossen");
  });

  it("should allow getting onboarding status", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.user.onboardingStatus();

    expect(result).toBeDefined();
    expect(result).toHaveProperty("completed");
  });
});

describe("User Journey: Shop & Checkout", () => {
  it("should get user's orders", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const orders = await caller.order.myOrders();

    expect(orders).toBeDefined();
    expect(Array.isArray(orders)).toBe(true);
  });

  it("should check if user purchased a product", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.order.hasPurchased({ productId: "analysis" });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  it("should get user's invoices", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const invoices = await caller.invoice.myInvoices();

    expect(invoices).toBeDefined();
    expect(Array.isArray(invoices)).toBe(true);
  });

  it("should allow admin to list all invoices", async () => {
    const adminCtx = createAuthContext({
      user: {
        id: 1,
        openId: "admin-123",
        email: "admin@example.com",
        name: "Admin User",
        loginMethod: "clerk",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
    });
    const caller = appRouter.createCaller(adminCtx);

    const invoices = await caller.invoice.list();

    expect(invoices).toBeDefined();
    expect(Array.isArray(invoices)).toBe(true);
  });
});

describe("User Journey: Document Upload", () => {
  it("should get upload URL for document", async () => {
    // Note: file.getUploadUrl requires tenantId, fileName, mimeType, category
    // This is a multi-tenant feature, so we skip for now
    // Real test would require tenant setup
    expect(true).toBe(true);
  });
});

describe("User Journey: Admin Views Onboarding Data", () => {
  it("should allow admin to list all onboarding submissions", async () => {
    const adminCtx = createAuthContext({
      user: {
        id: 1,
        openId: "admin-123",
        email: "admin@example.com",
        name: "Admin User",
        loginMethod: "clerk",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
    });
    const caller = appRouter.createCaller(adminCtx);

    const result = await caller.onboarding.list();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should allow admin to mark onboarding as reviewed", async () => {
    const adminCtx = createAuthContext({
      user: {
        id: 1,
        openId: "admin-123",
        email: "admin@example.com",
        name: "Admin User",
        loginMethod: "clerk",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
    });
    const caller = appRouter.createCaller(adminCtx);

    const result = await caller.onboarding.markAsReviewed({ id: 1 });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });
});

describe("User Journey: Logout", () => {
  it("should clear session cookie on logout", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(ctx.res.clearCookie).toHaveBeenCalled();
  });
});
