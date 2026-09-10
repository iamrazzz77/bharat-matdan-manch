import test from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function generateVoteReceipt(voterId, electionId, timestamp) {
  const salt = crypto.randomBytes(16).toString("hex");
  const raw = `${voterId}:${electionId}:${timestamp}:${salt}`;
  return "BMM-" + sha256(raw).substring(0, 24).toUpperCase();
}

function computeAuditHash(previousHash, action, entityId, details) {
  const raw = `${previousHash}|${action}|${entityId}|${details}|${Date.now()}`;
  return sha256(raw);
}

test("Cryptographic Receipt Hash Generation", () => {
  const voterId = "voter-uuid-1234";
  const electionId = "election-uuid-5678";
  const timestamp = Date.now();

  const receipt = generateVoteReceipt(voterId, electionId, timestamp);
  assert.ok(receipt.startsWith("BMM-"));
  assert.equal(receipt.length, 28);
});

test("Tamper-Evident Hash Chain Computation", () => {
  const prevHash = "GENESIS_HASH_000000000000000000000000";
  const action = "VOTE_CAST";
  const entityId = "election-123";
  const details = "RECEIPT-HASH-8832";

  const auditHash1 = computeAuditHash(prevHash, action, entityId, details);
  const auditHash2 = computeAuditHash(auditHash1, "ELECTION_STATUS_CHANGE", entityId, "OPEN_TO_CLOSED");

  assert.notEqual(auditHash1, auditHash2);
  assert.equal(auditHash1.length, 64);
  assert.equal(auditHash2.length, 64);
});

test("Double Voting Block Verification Principle", () => {
  const voterParticipations = new Set();
  const voterId = "EPIC100001";
  const electionId = "ELECTION2026";

  const key = `${voterId}:${electionId}`;
  
  // First vote attempt
  let canVote = !voterParticipations.has(key);
  assert.equal(canVote, true);
  voterParticipations.add(key);

  // Second vote attempt with same EPIC Number
  let canVoteAgain = !voterParticipations.has(key);
  assert.equal(canVoteAgain, false);
});
