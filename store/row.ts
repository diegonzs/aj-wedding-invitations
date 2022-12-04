import create from 'zustand'

interface RowStore {
  loading: boolean,
  rowId: string,
  invitations: number,
  setRowId: (id: string) => void
  setLoading: (value: boolean) => void
  setInvitations: (value: number) => void
}

export const useRowStore = create<RowStore>((set) => ({
  rowId: '',
  loading: false,
  invitations: 0,
  setRowId: (id) => set(() => ({ rowId: id })),
  setInvitations: (value) => set(() => ({ invitations: value })),
  setLoading: (value) => set(() => ({ loading: value }))
}))