import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { CreatedDevice } from "../types/device";

const devicesCollection = collection(db, "devices");

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const snapshot = await getDocs(devicesCollection);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  });
};

export const useToggleDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: boolean }) => {
      const deviceRef = doc(db, "devices", id + '');
      await updateDoc(deviceRef, { status });
      return { id, status };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["devices"] }),
  });
};

export const useRemoveDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const deviceRef = doc(db, "devices", id + '');
      await deleteDoc(deviceRef);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["devices"] }),
  });
};

export const useAddDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (device: CreatedDevice) => {
      const newDevice = { ...device }; 
      await addDoc(devicesCollection, newDevice);
      return newDevice;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["devices"] }),
  });
};
