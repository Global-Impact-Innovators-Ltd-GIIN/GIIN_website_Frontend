import prisma from "../src/lib/prisma";

async function main() {
    console.log("🌱 Seeding GIIN Loan Service Foundation...");

    // 1. Clear existing settings to avoid unique conflicts/confusion during seed
    await prisma.loanSettings.deleteMany();

    // 2. Seed Loan Settings (Interest Rates)
    const settings = [
        { duration: 1, interestRate: 0.15, activeStatus: true },
        { duration: 2, interestRate: 0.25, activeStatus: true },
        { duration: 4, interestRate: 0.40, activeStatus: true },
    ];

    for (const setting of settings) {
        // @ts-ignore - Temporary bypass for Next.js build type cache issues
        await prisma.loanSettings.create({
            data: {
                duration: setting.duration,
                interestRate: setting.interestRate,
                activeStatus: setting.activeStatus,
                exchangeRate: 1.0,
                overduePenalty: 0.0
            }
        });
    }
    console.log("✅ Seeded Loan Settings (Interest Rates)");

    // 3. Ensure Core Permissions for Loan Service
    const loanPermissionActions = [
        "loan.apply", "loan.approve", "loan.disburse", "loan.repay", "loan.report", "loan.manage.collateral"
    ];

    for (const action of loanPermissionActions) {
        await prisma.permission.upsert({
            where: { action },
            update: {},
            create: { action }
        });
    }
    console.log("✅ Seeded Loan Permissions");

    // 4. Ensure Loan Specific Roles
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
