"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pycolors/ui";

const members = [
  { id: "m_1", name: "Ava Martin", role: "Owner" },
  { id: "m_2", name: "Noah Chen", role: "Member" },
  { id: "m_3", name: "Mia Taylor", role: "Member" },
  { id: "m_4", name: "Leo Garcia", role: "Member" },
  { id: "m_5", name: "Zoe Patel", role: "Member" },
];
const pageSize = 2;
const totalPages = Math.ceil(members.length / pageSize);

export function MembersTable() {
  const [page, setPage] = React.useState(1);
  const visibleMembers = members.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full space-y-4">
      <Table>
        <TableCaption>Example workspace members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Name</TableHead>
            <TableHead scope="col">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p role="status" className="text-center text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <Pagination aria-label="Members pages">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  aria-label={`Page ${number}`}
                  isActive={page === number}
                  onClick={() => setPage(number)}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
