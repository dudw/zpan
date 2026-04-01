import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { Storage } from '@zpan/shared'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AlertDialog } from '@/components/ui/alert-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useStorages, useDeleteStorage } from '@/features/admin/api'
import { StorageForm } from '@/features/admin/components/storage-form'
import { formatBytes } from '@/features/admin/components/format'

export const Route = createFileRoute('/_authenticated/admin/storages/')({
  component: StorageBackendsPage,
})

function StorageBackendsPage() {
  const { data, isLoading } = useStorages()
  const deleteStorage = useDeleteStorage()
  const [formOpen, setFormOpen] = useState(false)
  const [editStorage, setEditStorage] = useState<Storage | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Storage | null>(null)

  const items = data?.items ?? []

  function handleEdit(s: Storage) {
    setEditStorage(s)
    setFormOpen(true)
  }

  function handleAdd() {
    setEditStorage(null)
    setFormOpen(true)
  }

  function handleDelete() {
    if (!deleteTarget) return
    deleteStorage.mutate(deleteTarget.id, {
      onSuccess: () => toast.success('Storage deleted'),
      onError: (err) => toast.error(err.message),
    })
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Storage Backends</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Storage
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-24">Mode</TableHead>
              <TableHead>Bucket</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead className="w-40">Usage</TableHead>
              <TableHead className="w-20">Priority</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Loading…
                </TableCell>
              </TableRow>
            )}
            {!isLoading && items.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No storage backends configured
                </TableCell>
              </TableRow>
            )}
            {items.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell>
                  <Badge variant={s.mode === 'public' ? 'default' : 'secondary'}>{s.mode}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{s.bucket}</TableCell>
                <TableCell className="text-muted-foreground truncate max-w-[200px]">
                  {s.endpoint}
                </TableCell>
                <TableCell>
                  <UsageCell storage={s} />
                </TableCell>
                <TableCell className="text-center">{s.priority}</TableCell>
                <TableCell>
                  <Badge variant={s.status === 1 ? 'outline' : 'destructive'}>
                    {s.status === 1 ? 'Active' : 'Disabled'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(s)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteTarget(s)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <StorageForm open={formOpen} onOpenChange={setFormOpen} storage={editStorage} />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Storage"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        pending={deleteStorage.isPending}
        onConfirm={handleDelete}
      />
    </div>
  )
}

function UsageCell({ storage }: { storage: Storage }) {
  if (!storage.capacityBytes) {
    return (
      <span className="text-sm text-muted-foreground">
        {formatBytes(storage.usedBytes)} / Unlimited
      </span>
    )
  }

  const pct = Math.round((storage.usedBytes / storage.capacityBytes) * 100)
  return (
    <div className="space-y-1">
      <Progress value={pct} className="h-2" />
      <p className="text-xs text-muted-foreground">
        {formatBytes(storage.usedBytes)} / {formatBytes(storage.capacityBytes)}
      </p>
    </div>
  )
}
