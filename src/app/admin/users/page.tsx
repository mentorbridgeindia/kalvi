'use client';

import { useState } from 'react';
import { Card, Loader } from '@/ui';
import { UserTable } from './components/UserTable';
import { useUsers, useUpdateUserRole, useUpdateUserStatus } from '@/hooks/useUsers';
import { PaginationControls } from '@/ui/pagination';
import { USER_ROLES, STATUS } from '@/lib/constants';

export default function UsersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useUsers(page, 10);
  const updateRoleMutation = useUpdateUserRole();
  const updateStatusMutation = useUpdateUserStatus();

  const handleRoleChange = async (
    userId: string,
    role: typeof USER_ROLES.USER | typeof USER_ROLES.ADMIN
  ) => {
    await updateRoleMutation.mutateAsync({ userId, role });
  };

  const handleStatusChange = async (
    userId: string,
    status: typeof STATUS.ACTIVE | typeof STATUS.INACTIVE
  ) => {
    await updateStatusMutation.mutateAsync({ userId, status });
  };

  if (isLoading && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-error-50 p-4 text-error-800">
        Error loading users: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">Users</h1>
        <p className="mt-2 text-sm text-secondary-600">
          Manage user roles and status. You cannot modify your own role or status.
        </p>
      </div>

      <Card className="mb-6">
        <UserTable
          users={data?.data ?? []}
          onRoleChange={handleRoleChange}
          onStatusChange={handleStatusChange}
        />
      </Card>

      {data && data.totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

