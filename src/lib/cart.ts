/**
 * Bag rules shared by the browser and the server, so the two can't disagree.
 * The checkout action enforces the same cap — this just stops the customer
 * building a bag it will later refuse.
 */
export const MAX_QTY_PER_LINE = 10;
