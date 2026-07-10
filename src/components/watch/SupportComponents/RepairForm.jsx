import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, ImagePlus, X, MessageCircle } from "lucide-react";

function RepairForm({ device, selectedModel }) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;



    setShowToast(true);
    setForm({ name: "", phone: "", description: "" });
    setImages([]);

    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <section id="repair-form" className="relative bg-[#f5f5f7] dark:bg-slate-950 py-28 transition-colors duration-300">
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[300] transition-all duration-500 ${showToast ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-6 pointer-events-none"
          }`}
      >
        <div className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-2xl px-6 py-4 min-w-[320px]">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/15">
            <MessageCircle className="text-green-600 dark:text-green-400" size={22} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {t("support.repair_form.Success Message")
}
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {t("support.repair_form.Selected Device")}: {selectedModel}
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="ml-2 shrink-0 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-slate-500 transition"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* FORMA */}
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {t("support.repair_form.Title")}
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-10 text-center">
          {t("support.repair_form.Subtitle")} — {device} / {selectedModel}
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              {t("support.repair_form.Name")}
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("support.repair_form.Name")}
              className="w-full border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              {t("support.repair_form.Phone")}
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={t("support.repair_form.Phone")}
              className="w-full border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              {t("support.repair_form.Description")
}
            </label>
            <textarea
              name="support.repair_form.Description"
              value={form.description}
              onChange={handleChange}
              placeholder={t("support.repair_form.Description")}
              rows={4}
              className="w-full border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              {t("support.repair_form.Images")
}
            </label>

            <div className="flex flex-wrap gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700">
                  <img src={img.url} alt={`upload-${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 rounded-full p-1"
                  >
                    <X size={12} className="text-white" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-700 flex flex-col items-center justify-center text-gray-400 dark:text-slate-500 hover:border-blue-500 hover:text-blue-500 transition"
              >
                <ImagePlus size={20} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-medium py-3.5 rounded-xl hover:bg-slate-800 dark:hover:bg-gray-200 transition"
          >
            <CheckCircle2 size={18} />
            {t("support.repair_form.Submit")
}
          </button>
        </form>
      </div>
    </section>
  );
}

export default RepairForm;