import create from 'zustand'

interface RowStore {
  loading: boolean,
  rowId: string,
  familyName: string,
  invitations: number,
  setRowId: (id: string) => void
  setLoading: (value: boolean) => void
  setInvitations: (value: number) => void
  setFamilyName: (name: string) => void
}

export const useRowStore = create<RowStore>((set) => ({
  rowId: '',
  familyName: '',
  loading: false,
  invitations: 0,
  setRowId: (id) => set(() => ({ rowId: id })),
  setInvitations: (value) => set(() => ({ invitations: value })),
  setLoading: (value) => set(() => ({ loading: value })),
  setFamilyName: (value) => set(() => ({ familyName: value }))
}))