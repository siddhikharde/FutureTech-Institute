import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function StudentTable() {


  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Students</h2>

      <table className="w-full border border-gray-200 ">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Enrolled Courses</th>
            <th className="p-3 border">Total Fee</th>
            <th className="p-3 border">Remaining Fee</th>
            <th className="p-3 border">Enroll</th>
          </tr>
        </thead>

        
      </table>
    </div>
  );
}

export default StudentTable;
