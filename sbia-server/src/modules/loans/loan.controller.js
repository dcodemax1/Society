import {
  createLoan,
  getAllLoans,
  getLoanById,
  getLoansByMemberId,
  updateLoanStatus,
  getLoanStatistics,
} from "./loan.service.js";
import { success, error } from "../../utils/response.js";

/**
 * Submit a new loan application
 */
export const submitLoanApplication = async (req, res) => {
  try {
    const loanData = req.body;

    // Automatically set loanRequestDate to today if not provided
    if (!loanData.loanRequestDate) {
      const today = new Date();
      loanData.loanRequestDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    }

    // Validate required fields
    const requiredFields = [
      "memberId",
      "memberName",
      "registeredMobile",
      "registeredAddress",
      "dateOfJoining",
      "loanAmount",
      "purposeOfLoan",
      "emiTenure",
      "whenLoanRequired",
      "paymentTransferMode",
      "guarantor1Name",
      "guarantor1MemberId",
      "guarantor1Mobile",
      "guarantor2Name",
      "guarantor2MemberId",
      "guarantor2Mobile",
    ];

    for (const field of requiredFields) {
      if (!loanData[field]) {
        return res.status(400).json(error(`${field} is required`));
      }
    }

    // Validate declarations
    if (!loanData.loanDeclarationAccepted) {
      return res.status(400).json(error("Loan declaration must be accepted"));
    }

    if (!loanData.agreedToLoanTerms) {
      return res.status(400).json(error("Must agree to loan terms"));
    }

    // Create loan
    const result = await createLoan(loanData);
    return res.json(
      success("Loan application submitted successfully", result.data)
    );
  } catch (err) {
    console.error("Error submitting loan:", err);
    return res
      .status(500)
      .json(error(err.message || "Failed to submit loan application"));
  }
};

/**
 * Get all loans (admin only)
 */
export const fetchAllLoans = async (req, res) => {
  try {
    const { status, memberId, search } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (memberId) filters.memberId = memberId;
    if (search) filters.search = search;

    const result = await getAllLoans(filters);
    return res.json({
      success: true,
      status: "success",
      message: "Loans fetched successfully",
      data: result.data,
    });
  } catch (err) {
    console.error("Error fetching loans:", err);
    return res.status(500).json(error(err.message || "Failed to fetch loans"));
  }
};

/**
 * Get loan by ID
 */
export const fetchLoanById = async (req, res) => {
  try {
    const { loanId } = req.params;

    if (!loanId) {
      return res.status(400).json(error("Loan ID is required"));
    }

    const loan = await getLoanById(loanId);

    if (!loan) {
      return res.status(404).json(error("Loan not found"));
    }

    return res.json(success("Loan fetched successfully", loan));
  } catch (err) {
    console.error("Error fetching loan:", err);
    return res.status(500).json(error(err.message || "Failed to fetch loan"));
  }
};

/**
 * Get loans by member ID
 */
export const fetchLoansByMemberId = async (req, res) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      return res.status(400).json(error("Member ID is required"));
    }

    const result = await getLoansByMemberId(memberId);
    return res.json(success("Member loans fetched successfully", result.data));
  } catch (err) {
    console.error("Error fetching member loans:", err);
    return res
      .status(500)
      .json(error(err.message || "Failed to fetch member loans"));
  }
};

/**
 * Update loan status (admin only)
 */
export const changeLoanStatus = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { status, adminNotes } = req.body;

    if (!loanId) {
      return res.status(400).json(error("Loan ID is required"));
    }

    if (!status) {
      return res.status(400).json(error("Status is required"));
    }

    const validStatuses = [
      "PENDING",
      "APPROVED",
      "REJECTED",
      "DISBURSED",
      "CLOSED",
      "DEFAULTED",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json(error("Invalid status value"));
    }

    const result = await updateLoanStatus(loanId, status, adminNotes || null);
    return res.json(result);
  } catch (err) {
    console.error("Error updating loan status:", err);
    return res
      .status(500)
      .json(error(err.message || "Failed to update loan status"));
  }
};

/**
 * Get loan statistics (admin only)
 */
export const fetchLoanStatistics = async (req, res) => {
  try {
    const result = await getLoanStatistics();
    return res.json(
      success("Loan statistics fetched successfully", result.data)
    );
  } catch (err) {
    console.error("Error fetching loan statistics:", err);
    return res
      .status(500)
      .json(error(err.message || "Failed to fetch loan statistics"));
  }
};
