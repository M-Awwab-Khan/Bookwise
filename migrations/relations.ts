import { relations } from "drizzle-orm/relations";
import { books, borrowRecords, users, bookEmbeddings, interactions, userCfRecs } from "./schema";

export const borrowRecordsRelations = relations(borrowRecords, ({one}) => ({
	book: one(books, {
		fields: [borrowRecords.bookId],
		references: [books.id]
	}),
	user: one(users, {
		fields: [borrowRecords.userId],
		references: [users.id]
	}),
}));

export const booksRelations = relations(books, ({many}) => ({
	borrowRecords: many(borrowRecords),
	bookEmbeddings: many(bookEmbeddings),
	interactions: many(interactions),
}));

export const usersRelations = relations(users, ({many}) => ({
	borrowRecords: many(borrowRecords),
	interactions: many(interactions),
	userCfRecs: many(userCfRecs),
}));

export const bookEmbeddingsRelations = relations(bookEmbeddings, ({one}) => ({
	book: one(books, {
		fields: [bookEmbeddings.bookId],
		references: [books.id]
	}),
}));

export const interactionsRelations = relations(interactions, ({one}) => ({
	book: one(books, {
		fields: [interactions.bookId],
		references: [books.id]
	}),
	user: one(users, {
		fields: [interactions.userId],
		references: [users.id]
	}),
}));

export const userCfRecsRelations = relations(userCfRecs, ({one}) => ({
	user: one(users, {
		fields: [userCfRecs.userId],
		references: [users.id]
	}),
}));