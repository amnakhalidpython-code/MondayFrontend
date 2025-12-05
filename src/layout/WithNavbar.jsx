import Navbar from "../components/Navbar";

export default function WithNavbar({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
