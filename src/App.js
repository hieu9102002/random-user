import React, { useEffect, useState } from "react";
import Users from "./components/Users";
import Pagination from "./components/Pagination";
import Dropdown from "./components/Dropdown";
import "./custom.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [sortType, setSortType] = useState("None");
  const [usersPerPage] = useState(10);
  const [maxUsers] = useState(100);
  const [currentUsers, setCurrentUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const response = await fetch(
        "https://randomuser.me/api/?inc=name,login,picture&results=" + maxUsers
      );
      const data = await response.json();
      // const usersArr = data.results.map((user)=>{
      //   user.name = user.name.title + " " + user.name.first + " " + user.name.last;
      // })
      setUsers(data.results);
      setLoading(false);
    };
    getUsers();
  }, []);

  // useEffect(()=>{
  //   let data = [...users];
  //   switch(sortType){
  //     case "Fullname":
  //       data.sort((a,b) => 
  //         {
  //           if (a.name.title+a.name.first+a.name.last > b.name.title+b.name.first+b.name.last) return 1;
  //           if (a.name.title+a.name.first+a.name.last < b.name.title+b.name.first+b.name.last) return -1;
  //           return 0;
  //         }
  //       );
  //       break;
  //     case "Fullname + Username":
  //       data.sort((a,b) => 
  //         {
  //           if (a.name.title+a.name.first+a.name.last+a.login.username > b.name.title+b.name.first+b.name.last+b.login.username) return 1;
  //           if (a.name.title+a.name.first+a.name.last+a.login.username < b.name.title+b.name.first+b.name.last+b.login.username) return -1;
  //           return 0;
  //         }
  //       );
  //       break;
  //   }
  //   setUsers(data);
  // }, [sortType]);

  const sort = () => {
    let data = [...users];
          data.sort((a,b) => 
          {
            if (a.name.title+a.name.first+a.name.last+a.login.username > b.name.title+b.name.first+b.name.last+b.login.username) return 1;
            if (a.name.title+a.name.first+a.name.last+a.login.username < b.name.title+b.name.first+b.name.last+b.login.username) return -1;
            return 0;
          }
        );
    setUsers(data);
  }

  useEffect(()=>{
    console.log(users);

    const indexOfLastUser = curPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const arr = users.slice(indexOfFirstUser, indexOfLastUser)
    setCurrentUsers(arr);
  }, [users, curPage]);

  const paginate = (page) => setCurPage(page);

  // const sortOptions = ["None", "Fullname", "Fullname + Username"];
  // const indexOfLastUser = curPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = (users.slice(indexOfFirstUser, indexOfLastUser));
  return (
    <div className="container">
      <h1>Frontend Interview Assignment</h1>
      {/* <Dropdown label="Sort by: " options={sortOptions} dropdownChange={setSortType}/> */}
      <button onClick={sort}>Sort by Fullname and Username</button>
      <Users users={currentUsers} loading={loading} />
      <Pagination
        usersPerPage={usersPerPage}
        noUsers={maxUsers}
        maxPagesAdjToCurrent={2}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
