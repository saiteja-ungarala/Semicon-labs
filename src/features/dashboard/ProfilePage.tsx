import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { FormBanner } from '@/features/auth/AuthShell';
import { useAuthStore } from '@/stores/auth';
import { apiErrorMessage } from '@/lib/api';
import { useUpdateProfile } from './api';

interface ProfileForm {
  firstName: string;
  lastName: string;
  headline: string;
  country: string;
}

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const update = useUpdateProfile();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      headline: '',
      country: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError('');
    setSaved(false);
    try {
      await update.mutateAsync(values);
      setSaved(true);
    } catch (err) {
      setError(apiErrorMessage(err, 'Could not save your profile'));
    }
  });

  return (
    <div className="max-w-xl">
      <h2 className="mb-6 text-xl font-bold">Profile</h2>

      {saved && <FormBanner tone="success">Your profile has been updated.</FormBanner>}
      {error && <FormBanner tone="error">{error}</FormBanner>}

      <div className="rounded-2xl border border-line bg-panel p-7 shadow-card">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <TextField label="First name" error={errors.firstName?.message} {...register('firstName', { required: 'Required' })} />
            <TextField label="Last name" error={errors.lastName?.message} {...register('lastName', { required: 'Required' })} />
          </div>
          <TextField label="Email" value={user?.email ?? ''} disabled hint="Contact support to change your email." />
          <TextField label="Headline" placeholder="e.g. Physical Design Engineer" {...register('headline')} />
          <TextField label="Country" placeholder="e.g. India" {...register('country')} />
          <Button type="submit" disabled={update.isPending} arrow={!update.isPending}>
            {update.isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </form>
      </div>
    </div>
  );
}
