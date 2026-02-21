"use client";
import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function ItineraryFields({
  itineraries,
  setItineraries,
  errors,
  setValue,
  // ✅ maxDays prop removed - no limit
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addItinerary = () => {
    // ✅ No limit check - user can add unlimited days
    const newItinerary = {
      day_number: itineraries.length + 1,
      title: "",
      description: "",
      accommodation: "",
      meals: "",
    };
    const newItineraries = [...itineraries, newItinerary];
    setItineraries(newItineraries);
    setValue("itineraries", newItineraries, { shouldValidate: true });
    setExpandedIndex(itineraries.length); // Auto-expand new day
  };

  const removeItinerary = (index) => {
    const updatedItineraries = itineraries.filter((_, i) => i !== index);
    
    // Reorder day numbers
    const reorderedItineraries = updatedItineraries.map((item, i) => ({
      ...item,
      day_number: i + 1,
    }));

    setItineraries(reorderedItineraries);
    setValue("itineraries", reorderedItineraries, { shouldValidate: true });

    // Adjust expanded index
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const updateItinerary = (index, field, value) => {
    const updatedItineraries = [...itineraries];
    updatedItineraries[index] = {
      ...updatedItineraries[index],
      [field]: value,
    };
    setItineraries(updatedItineraries);
    setValue("itineraries", updatedItineraries, { shouldValidate: true });
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Day-wise Itinerary (Optional)
        </label>
        <button
          type="button"
          onClick={addItinerary}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Day
        </button>
      </div>

      {errors?.itineraries &&
        typeof errors.itineraries === "object" &&
        !Array.isArray(errors.itineraries) && (
          <p className="text-sm text-red-600">{errors.itineraries.message}</p>
        )}

      {itineraries.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 mb-4 text-sm">No itineraries added yet</p>
            <p className="text-gray-400 text-xs mb-4">
              Click &quot;Add Day&quot; to create your first itinerary
            </p>
            <button
              type="button"
              onClick={addItinerary}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add First Day
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {itineraries.map((itinerary, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <div
                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-semibold">
                    {itinerary.day_number}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {itinerary.title || `Day ${itinerary.day_number}`}
                    </h4>
                    {itinerary.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {itinerary.description.substring(0, 60)}
                        {itinerary.description.length > 60 && "..."}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItinerary(index);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove day"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedIndex === index && (
                <div className="p-4 space-y-4 border-t border-gray-200">
                  <div>
                    <Input
                      label="Title *"
                      placeholder="e.g., Arrival in Bangkok"
                      value={itinerary.title}
                      onChange={(e) => updateItinerary(index, "title", e.target.value)}
                      error={errors?.itineraries?.[index]?.title?.message}
                    />
                  </div>

                  <div>
                    <Textarea
                      label="Description *"
                      placeholder="Describe the day's activities..."
                      rows={4}
                      value={itinerary.description}
                      onChange={(e) =>
                        updateItinerary(index, "description", e.target.value)
                      }
                      error={errors?.itineraries?.[index]?.description?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="Accommodation (Optional)"
                        placeholder="e.g., 5-star hotel"
                        value={itinerary.accommodation || ""}
                        onChange={(e) =>
                          updateItinerary(index, "accommodation", e.target.value)
                        }
                        error={errors?.itineraries?.[index]?.accommodation?.message}
                      />
                    </div>

                    <div>
                      <Input
                        label="Meals (Optional)"
                        placeholder="e.g., Breakfast, Lunch, Dinner"
                        value={itinerary.meals || ""}
                        onChange={(e) =>
                          updateItinerary(index, "meals", e.target.value)
                        }
                        error={errors?.itineraries?.[index]?.meals?.message}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}