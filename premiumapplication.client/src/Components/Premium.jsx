import React, { useState } from "react";

const Premium = () => {
    const [formData, setFormData] = useState({
        Name: "",
        AgeNextBirthDay: "",
        DateOfBirth: "",
        Occupation: "",
        DeathSumInsured: "",
    });

    const [monthlyPremium, setMonthlyPremium] = useState(null);
    const [error, setError] = useState("");

    const occupations = [
        "Cleaner",
        "Doctor",
        "Author",
        "Farmer",
        "Mechanic",
        "Florist",
        "Other",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculatePremium = async () => {
        setError("");
        setMonthlyPremium(null);
        try {
            const response = await fetch("https://localhost:7101/api/premium/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Name: formData.Name,
                    AgeNextBirthDay: parseInt(formData.AgeNextBirthDay),
                    DateOfBirth: formData.DateOfBirth,
                    Occupation: formData.Occupation,
                    DeathSumInsured: parseFloat(formData.DeathSumInsured)
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMonthlyPremium(data.monthlyPremium);
            } else {
                const text = await response.text;
                setError(text || "Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to connect to server");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: "420px" }}>
                <h3 className="text-center mb-4 text-primary">
                    Monthly Premium Calculator
                </h3>

                <div className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <input
                        type="text"
                        name="Name"
                        className="form-control"
                        value={formData.Name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Age Next Birthday</label>
                    <input
                        type="number"
                        name="AgeNextBirthDay"
                        className="form-control"
                        value={formData.AgeNextBirthDay}
                        onChange={handleChange}
                        placeholder="Enter your age"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Date of Birth (MM/YYYY)</label>
                    <input
                        type="month"
                        name="DateOfBirth"
                        className="form-control"
                        value={formData.DateOfBirth}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Occupation</label>
                    <select
                        name="Occupation"
                        className="form-select"
                        value={formData.Occupation}
                        onChange={handleChange}
                    >
                        <option value="">-- Select Occupation --</option>
                        {occupations.map((occ) => (
                            <option key={occ} value={occ}>
                                {occ}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Death Sum Insured (₹)</label>
                    <input
                        type="number"
                        name="DeathSumInsured"
                        className="form-control"
                        value={formData.DeathSumInsured}
                        onChange={handleChange}
                        placeholder="Enter amount"
                    />
                </div>

                <button className="btn btn-primary w-100 mt-2" onClick={calculatePremium}>
                    Calculate Premium
                </button>

                {monthlyPremium !== null && (
                    <div className="alert alert-success mt-4 text-center">
                        <strong>Monthly Premium: </strong> ₹{monthlyPremium.toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Premium;
