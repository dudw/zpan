import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useSystemOption, useSetSystemOption } from '@/features/admin/api'

export const Route = createFileRoute('/_authenticated/_app/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  const siteName = useSystemOption('site.name')
  const siteDesc = useSystemOption('site.description')
  const setOption = useSetSystemOption()

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    if (siteName.data) setName(siteName.data.value)
    if (siteDesc.data) setDesc(siteDesc.data.value)
  }, [siteName.data, siteDesc.data])

  function handleSave() {
    Promise.all([
      setOption.mutateAsync({ key: 'site.name', value: name }),
      setOption.mutateAsync({ key: 'site.description', value: desc }),
    ])
      .then(() => toast.success('Settings saved'))
      .catch((err: Error) => toast.error(err.message))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="max-w-lg space-y-4">
        <div className="space-y-1.5">
          <Label>Site Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Site Description</Label>
          <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} />
        </div>
        <Button onClick={handleSave} disabled={setOption.isPending}>
          {setOption.isPending ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </div>
  )
}
