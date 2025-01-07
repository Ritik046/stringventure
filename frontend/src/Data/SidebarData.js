import { BiUser, BiBookAlt } from "react-icons/bi";
import { CiSquareQuestion } from "react-icons/ci";
import UsersBoard from "../components/admin/UsersBoard";
import RequestsBoard from "../components/admin/RequestsBoard";
import RentedBoard from "../components/admin/RentedBorad";
import CreateBook from "../components/admin/CreateBook";


export const SideBarData = [
  {
    title: "Collections",
    subCategory: [
      { icon: <BiUser />, name: "Users" },
      { icon: <CiSquareQuestion />, name: "Book Requests" },
      { icon: <BiBookAlt />, name: "Rented Books" },
      
    ],
  },
  {
    title: "Extensions",
    subCategory: [
      { icon: <BiUser />, name: "Create Books" },
    
    ],
  },
];

export const AdminComps = [
  {
    name: "Users",
    comp: <UsersBoard />,
  },
  {
    name: "Book Requests",
    comp: <RequestsBoard />,
  },
  {
    name: "Rented Books",
    comp: <RentedBoard />,
  },
  {
    name: "Create Books",
    comp: <CreateBook />,
  },
 
];
