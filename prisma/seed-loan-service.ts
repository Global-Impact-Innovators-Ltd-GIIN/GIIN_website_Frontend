import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding GIIN Loan Service Foundation...");

    // 1. Seed Loan Settings (Interest Rates)
    const settings = [
        { duration: 1, interestRate: 0.15, activeStatus: true }, // 1 Week = 15%
        { duration: 2, interestRate: 0.25, activeStatus: true }, // 2 Weeks = 25%
        { duration: 4, interestRate: 0.40, activeStatus: true }, // 1 Month = 40% (Expansion)
    ];

    for (const setting of settings) {
        await prisma.loanSettings.create({
            data: setting
        });
    }
    console.log("✅ Seeded Loan Settings (Interest Rates)");

    // 2. Ensure Core Permissions for Loan Service
    const loanPermissions = [
        { action: "loan:apply", description: "Can apply for new loans" },
        { action: "loan:approve", description: "Can approve/reject applications" },
        { action: "loan:disburse", description: "Can record fund disbursements" },
        { action: "loan:repay", description: "Can record repayments" },
        { action: "loan:report", description: "Can view financial reports" },
        { action: "loan:collateral:manage", description: "Can record and release collateral" }
    ];

    for (const p of loanPermissions) {
        await prisma.permission.upsert({
            where: { action: p.action },
            update: {},
            create: p
        });
    }
    console.log("✅ Seeded Loan Permissions");

    // 3. Ensure Loan Specific Roles
    const loanRoles = [
        { name: "LOAN_OFFICER", description: "Reviews applications and collateral" },
        { name: "CASHIER", description: "Handles disbursements and repayments" },
        { name: "RECOVERY_OFFICER", description: "Manages overdue loans" },
        { name: "AUDITOR", description: "Platform oversight" }
    ];

    for (const r of loanRoles) {
        await prisma.role.upsert({
            where: { name: r.name },
            update: { description: r.description },
            create: r
        });
    }
    console.log("✅ Seeded Loan Roles");

    console.log("🚀 Loan Service Seed Complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
