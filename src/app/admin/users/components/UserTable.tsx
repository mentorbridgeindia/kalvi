'use client';

import { Table, type TableColumn } from '@/ui/table';
import { StatusBadge } from '@/ui/badge';
import { Button } from '@/ui/button';
import type { User } from '@/types/user';
import { USER_ROLES, STATUS } from '@/lib/constants';
import { useRole } from '@/hooks/useRole';

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, role: typeof USER_ROLES.USER | typeof USER_ROLES.ADMIN) => void;
  onStatusChange: (userId: string, status: typeof STATUS.ACTIVE | typeof STATUS.INACTIVE) => void;
}

export function UserTable({
  users,
  onRoleChange,
  onStatusChange,
}: UserTableProps) {
  const { user: currentUser } = useRole();

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (user) => (
        <span className="font-medium text-secondary-900">{user.name}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (user) => (
        <span className="text-secondary-600">{user.email}</span>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (user) => (
        <select
          value={user.role}
          onChange={(e) =>
            onRoleChange(
              user._id,
              e.target.value as typeof USER_ROLES.USER | typeof USER_ROLES.ADMIN
            )
          }
          disabled={currentUser?.userId === user._id}
          className="rounded-md border border-secondary-300 px-2 py-1 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-secondary-100 disabled:cursor-not-allowed"
        >
          <option value={USER_ROLES.USER}>User</option>
          <option value={USER_ROLES.ADMIN}>Admin</option>
        </select>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (user) => (
        <select
          value={user.status}
          onChange={(e) =>
            onStatusChange(
              user._id,
              e.target.value as typeof STATUS.ACTIVE | typeof STATUS.INACTIVE
            )
          }
          disabled={currentUser?.userId === user._id}
          className="rounded-md border border-secondary-300 px-2 py-1 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-secondary-100 disabled:cursor-not-allowed"
        >
          <option value={STATUS.ACTIVE}>Active</option>
          <option value={STATUS.INACTIVE}>Inactive</option>
        </select>
      ),
    },
  ];

  return <Table columns={columns} data={users} />;
}

