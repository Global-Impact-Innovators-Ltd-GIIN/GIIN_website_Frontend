export interface ProjectTask {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "review" | "done";
  dueDate: string;
}

export interface Invoice {
  id: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved";
  lastUpdate: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

export const mockTasks: ProjectTask[] = [
  { id: "t1", title: "Finalize AI Architecture", status: "done", dueDate: "2026-05-15" },
  { id: "t2", title: "Backend API Integration", status: "in_progress", dueDate: "2026-05-25" },
  { id: "t3", title: "Security Audit", status: "todo", dueDate: "2026-06-01" },
  { id: "t4", title: "Client Review Sync", status: "review", dueDate: "2026-05-22" }
];

export const mockInvoices: Invoice[] = [
  { id: "INV-2026-001", amount: "$45,000", status: "Paid", date: "Jan 15, 2026" },
  { id: "INV-2026-002", amount: "$32,500", status: "Paid", date: "Mar 01, 2026" },
  { id: "INV-2026-003", amount: "$15,000", status: "Pending", date: "May 20, 2026" }
];

export const mockTickets: Ticket[] = [
  { id: "TCK-842", subject: "Update staging environment SSL", status: "Resolved", lastUpdate: "2 days ago" },
  { id: "TCK-845", subject: "Query regarding Phase 3 deliverables", status: "Open", lastUpdate: "3 hours ago" }
];

export const mockDocuments: Document[] = [
  { id: "d1", name: "Master_Services_Agreement_Signed.pdf", type: "Contract", date: "Jan 10, 2026", size: "2.4 MB" },
  { id: "d2", name: "Q1_Architecture_Proposal.pdf", type: "Proposal", date: "Feb 05, 2026", size: "5.1 MB" },
  { id: "d3", name: "Security_Compliance_Report.pdf", type: "Report", date: "Apr 12, 2026", size: "1.2 MB" }
];
