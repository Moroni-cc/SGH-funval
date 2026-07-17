import { useEffect, useState } from "react";
import { getCourses } from "../../services/courses.service";

function CourseSelect() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCourses().then(setCourses).catch(() => setCourses([]));
    }, []);

    return (
        <div>
            <label
                htmlFor="curso"
                className="mb-2 block text-sm font-semibold text-[#1F2937]"
            >
                Curso
                <span className="ml-1 text-red-500">*</span>
            </label>

            <select
                id="curso"
                name="curso"
                defaultValue=""
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100"
            >
                <option value="" disabled>
                    Seleccionar curso
                </option>
                {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                        {course.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CourseSelect;