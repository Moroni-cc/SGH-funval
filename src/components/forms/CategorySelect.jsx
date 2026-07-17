import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories.service";

function CategorySelect() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCategories().then(setCategories).catch(() => setCategories([]));
    }, []);

    return (
        <div>
            <label
                htmlFor="categoriaServicio"
                className="mb-2 block text-sm font-semibold text-[#1F2937]"
            >
                Categoría de servicio
                <span className="ml-1 text-red-500">*</span>
            </label>

            <select
                id="categoriaServicio"
                name="categoriaServicio"
                defaultValue=""
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100"
            >
                <option value="" disabled>
                    Seleccionar categoría
                </option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CategorySelect;