import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "../firebase/app.js";

// create fireStore database

const database = getFirestore(firebaseApp);

/**
 * Get All Staffs Data From FireStore Database
 */

export const getAllStaffs = async (colName) => {
  // get all students data
  const staffs = await getDocs(collection(database, colName));

  // process students data

  const staffsDataList = [];

  staffs.forEach((staff) => {
    staffsDataList.push({ ...staff.data(), id: staff.id });
  });

  return staffsDataList;
};
/**
 * Get All Staffs Data From FireStore Database
 * Realtime Data Get
 */

export const getAllStaffsRealTime = async (colName, updateState) => {
  onSnapshot(
    query(collection(database, colName), orderBy("createdAt", "desc")),
    (snapShot) => {
      const staffsDataList = [];
      snapShot.docs.forEach((staff) => {
        staffsDataList.push({ ...staff.data(), id: staff.id });
      });
      updateState(staffsDataList);
    }
  );
};

/**
 * Get A Single Staff Data From FireStore Database
 */

export const getASingleStaff = async (colName, id) => {
  // get a single staff data
  const staff = await getDoc(doc(database, colName, id));

  //   return staff data
  return staff.data();
};

/**
 * Delete A Single Staff Data From FireStore Database
 */

export const getDeleteAStaff = async (colName, id) => {
  // delete a single staff data
  const deleteAStaff = await deleteDoc(doc(database, colName, id));

  //   return staff data
  return deleteAStaff.data();
};

/**
 * Create A New Staff Data For FireStore Database
 * docId  create with id
 * otherwise create with autoId
 */

export const createAStaff = async (colName, data, docId = null) => {
  // create a new staff

  if (docId) {
    await setDoc(doc(database, colName, docId), data);
  } else {
    await addDoc(collection(database, colName), data);
  }
};

/**
 * Update A Staff Data For FireStore Database
 */

export const updateAStaff = async (colName, id, data) => {
  // update a staff
  await updateDoc(doc(database, colName, id), data);
};
