import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="flex">
        <aside className="w-64 border-r border-secondary-200 bg-white">
          <div className="p-6">
            <h2 className="text-xl font-bold text-secondary-900">
              Admin Panel
            </h2>
          </div>
          <nav className="px-4 py-2">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/categories"
                  className="block rounded-md px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/subcategories"
                  className="block rounded-md px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900"
                >
                  Subcategories
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="block rounded-md px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900"
                >
                  Users
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
