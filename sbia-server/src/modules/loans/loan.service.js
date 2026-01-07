import pool from "../../config/db.js";

/**
 * Generate unique loan ID (auto-increment)
 */
export const generateLoanId = async () => {
  // Get the max ID from loans table
  const query = `
    SELECT MAX(CAST(SUBSTRING_INDEX(loan_id, '-', -1) AS UNSIGNED)) as maxId 
    FROM loans
  `;

  const [rows] = await pool.query(query);
  const maxId = rows[0]?.maxId || 0;
  const nextId = maxId + 1;

  return nextId.toString();
};

/**
 * Create a new loan application
 */
export const createLoan = async (loanData) => {
  const loanId = await generateLoanId();

  const query = `
    INSERT INTO loans (
      loan_id,
      member_id,
      member_name,
      father_name,
      registered_mobile,
      registered_address,
      monthly_contribution,
      date_of_joining,
      membership_duration,
      loan_request_date,
      loan_amount,
      purpose_of_loan,
      purpose_of_loan_other,
      emi_tenure,
      when_loan_required,
      payment_transfer_mode,
      upi_id,
      bank_name,
      account_number,
      ifsc_code,
      account_type,
      guarantor1_name,
      guarantor1_member_id,
      guarantor1_mobile,
      guarantor1_membership_duration,
      guarantor2_name,
      guarantor2_member_id,
      guarantor2_mobile,
      guarantor2_membership_duration,
      guarantor2_consent,
      bank_document_type,
      bank_document_path,
      loan_declaration_accepted,
      agreed_to_loan_terms,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    loanId,
    loanData.memberId,
    loanData.memberName,
    loanData.fathersName || null,
    loanData.registeredMobile,
    loanData.registeredAddress,
    loanData.monthlyContribution || null,
    loanData.dateOfJoining,
    loanData.membershipDuration || null,
    loanData.loanRequestDate,
    loanData.loanAmount,
    loanData.purposeOfLoan || null,
    loanData.purposeOfLoanOther || null,
    loanData.emiTenure,
    loanData.whenLoanRequired || null,
    loanData.paymentTransferMode,
    loanData.upiId || null,
    loanData.bankName || null,
    loanData.accountNumber || null,
    loanData.ifscCode || null,
    loanData.accountType || null,
    loanData.guarantor1Name,
    loanData.guarantor1MemberId,
    loanData.guarantor1Mobile,
    loanData.guarantor1MembershipDuration || null,
    loanData.guarantor2Name,
    loanData.guarantor2MemberId,
    loanData.guarantor2Mobile,
    loanData.guarantor2MembershipDuration || null,
    loanData.guarantor2Consent === true || loanData.guarantor2Consent === "YES"
      ? "YES"
      : "NO",
    loanData.bankDocumentType || null,
    loanData.bankDocumentPath || null,
    loanData.loanDeclarationAccepted === true ||
    loanData.loanDeclarationAccepted === "YES"
      ? "YES"
      : "NO",
    loanData.agreedToLoanTerms === true || loanData.agreedToLoanTerms === "YES"
      ? "YES"
      : "NO",
    "PENDING",
  ];

  try {
    const [result] = await pool.query(query, values);
    return {
      success: true,
      message: "Loan application submitted successfully",
      data: {
        loanId,
        id: result.insertId,
      },
    };
  } catch (err) {
    throw new Error(`Failed to create loan: ${err.message}`);
  }
};

/**
 * Get all loans
 */
export const getAllLoans = async (filters = {}) => {
  let query = `SELECT * FROM loans WHERE 1=1`;
  const values = [];

  if (filters.status) {
    query += ` AND status = ?`;
    values.push(filters.status);
  }

  if (filters.memberId) {
    query += ` AND member_id = ?`;
    values.push(filters.memberId);
  }

  if (filters.search) {
    query += ` AND (member_name LIKE ? OR member_id LIKE ? OR loan_id LIKE ?)`;
    const searchTerm = `%${filters.search}%`;
    values.push(searchTerm, searchTerm, searchTerm);
  }

  query += ` ORDER BY created_at DESC`;

  try {
    const [loans] = await pool.query(query, values);
    return {
      success: true,
      data: loans,
    };
  } catch (err) {
    throw new Error(`Failed to fetch loans: ${err.message}`);
  }
};

/**
 * Get loan by ID
 */
export const getLoanById = async (loanId) => {
  const query = `SELECT * FROM loans WHERE loan_id = ?`;

  try {
    const [loans] = await pool.query(query, [loanId]);
    if (loans.length === 0) {
      return null;
    }
    return loans[0];
  } catch (err) {
    throw new Error(`Failed to fetch loan: ${err.message}`);
  }
};

/**
 * Get loans by member ID
 */
export const getLoansByMemberId = async (memberId) => {
  const query = `SELECT * FROM loans WHERE member_id = ? ORDER BY created_at DESC`;

  try {
    const [loans] = await pool.query(query, [memberId]);
    return {
      success: true,
      data: loans,
    };
  } catch (err) {
    throw new Error(`Failed to fetch member loans: ${err.message}`);
  }
};

/**
 * Update loan status (admin only)
 */
export const updateLoanStatus = async (loanId, status, adminNotes = null) => {
  const query = `UPDATE loans SET status = ?, admin_notes = ? WHERE loan_id = ?`;
  const values = [status, adminNotes, loanId];

  try {
    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
      throw new Error("Loan not found");
    }
    return {
      success: true,
      message: "Loan status updated successfully",
    };
  } catch (err) {
    throw new Error(`Failed to update loan status: ${err.message}`);
  }
};

/**
 * Get loan statistics for dashboard
 */
export const getLoanStatistics = async () => {
  const query = `
    SELECT 
      COUNT(*) as total_loans,
      SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) as pending_loans,
      SUM(CASE WHEN status = 'APPROVED' THEN 1 ELSE 0 END) as approved_loans,
      SUM(CASE WHEN status = 'DISBURSED' THEN 1 ELSE 0 END) as disbursed_loans,
      SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) as rejected_loans,
      SUM(loan_amount) as total_loan_amount,
      AVG(loan_amount) as average_loan_amount
    FROM loans
  `;

  try {
    const [stats] = await pool.query(query);
    return {
      success: true,
      data: stats[0],
    };
  } catch (err) {
    throw new Error(`Failed to fetch loan statistics: ${err.message}`);
  }
};
