"use client";

import { useState } from 'react';
import BuilderInput from "../../page-builder/utils/builder/builder-input";
import BuilderSelect from "../../page-builder/utils/builder/builder-select";
import { showToast } from "../../page-builder/utils/toast";

import { componentDefaults } from "../content/data";

export default function FormPersonalData({
    onUpdate,
    update,
    sectionId,
    brandName,
    pageTitle,

    nameLabel,
    nameRequired,
    nameVisible,
    emailLabel,
    emailRequired,
    emailVisible,
    whatsappVisible,
    genderVisible,
    dobVisible,
    marketingConsentVisible,
    collectionConsentVisible,

    marketingConsentLabel,
    collectionConsentLabel,

    nameFieldId,
    emailFieldId,
    whatsappFieldId,
    genderFieldId,
    dobFieldId,
    marketingConsentId,
    collectionConsentId,

    showSubmit = true,
    className = ""
}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsappNumber: '',
        gender: '',
        dob: '',
        marketingConsent: false,
        collectionConsent: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const calculateAge = (dobString) => {
        if (!dobString) return "null";
        const today = new Date();
        const birthDate = new Date(dobString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' || type === 'radio') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
            return;
        }

        if (name === 'whatsappNumber') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getDeviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
        return "Desktop";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        const genderMap = { 'male': 'M', 'female': 'F', 'other': 'other' };
        const now = new Date();
        const createdDate = now.toISOString().replace('T', ' ').split('.')[0];

        const submissionData = {
            "collectionConsent": String(formData.collectionConsent),
            "marketingConsent": String(formData.marketingConsent),
            "event": `Website Tactical - ${brandName} ${pageTitle}`.trim(),
            "brand": brandName,
            "product": "",
            "firstName": formData.name,
            "lastName": "",
            "whatsappNumber": `62${formData.whatsappNumber}`,
            "whatsappNumberValidated": "",
            "email": formData.email,
            "gender": genderMap[formData.gender] || formData.gender,
            "maritalStatus": "",
            "dob": formData.dob,
            "age": calculateAge(formData.dob),
            "city": "",
            "address": "",
            "createdDate": createdDate,
            "updateDate": createdDate,
            "label1": "Channel",
            "value1": "Website",
            "label2": " Jenis Kategori",
            "value2": "Newsletter",
            "label3": "",
            "value3": "",
            "label4": "",
            "value4": "",
            "label5": "",
            "value5": "",
            "label6": "",
            "value6": "",
            "label7": "",
            "value7": "",
            "label8": "",
            "value8": "",
            "label9": "",
            "value9": "",
            "label10": "",
            "value10": ""
        };

        try {
            console.log('Sending form data to Confluent Proxy...', submissionData);

            const response = await fetch('/api/post-data-confluent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                showToast("Form submitted successfully!");
                if (onUpdate) {
                    onUpdate({ isOpen: false });
                }
            } else {
                const text = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(text);
                } catch (e) {
                    errorData = { message: 'Non-JSON response', raw: text };
                }
                console.error('Submission failed:', errorData);
                showToast("Failed to submit form. Please try again.", "error");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showToast("An error occurred. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Use defaults from data.js if not provided, with hardcoded fallbacks as safety net
    const mktLabel = marketingConsentLabel ||
        componentDefaults["form-personal-data-section"]?.marketingConsentLabel ||
        "I agree to receive information about exciting offers, product updates, and other information from [brand_name] and other Wings brands.";

    const collLabel = collectionConsentLabel ||
        componentDefaults["form-personal-data-section"]?.collectionConsentLabel ||
        "I agree to allow Wings to manage my personal data in accordance with the Wings Privacy Policy.";

    return (
        <form className={`form-container ${className}`} onSubmit={handleSubmit}>
            <BuilderInput
                label={nameLabel || "Full Name"}
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                isVisible={nameVisible !== false}
                onVisibilityChange={update('nameVisible')}
                sectionId={sectionId}
                id={nameFieldId}
                onIdChange={update('nameFieldId')}
                suffix="name-field"
                required={true}
                onLabelChange={update('nameLabel')}
            />

            <BuilderInput
                label={emailLabel || "Email Address"}
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                isVisible={emailVisible !== false}
                onVisibilityChange={update('emailVisible')}
                sectionId={sectionId}
                id={emailFieldId}
                onIdChange={update('emailFieldId')}
                suffix="email-field"
                required={true}
                onLabelChange={update('emailLabel')}
            />

            <BuilderInput
                label="WhatsApp Number"
                type="tel"
                name="whatsappNumber"
                placeholder="812 3456 7890"
                value={formData.whatsappNumber}
                onChange={handleChange}
                isVisible={whatsappVisible !== false}
                onVisibilityChange={update('whatsappVisible')}
                sectionId={sectionId}
                id={whatsappFieldId}
                onIdChange={update('whatsappFieldId')}
                suffix="whatsapp-field"
                inputMode="numeric"
                pattern="[0-9]*"
                required={true}
            >
                <span className="form-prefix">+62</span>
            </BuilderInput>

            <BuilderSelect
                label="Gender"
                type="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                isVisible={genderVisible !== false}
                onVisibilityChange={update('genderVisible')}
                sectionId={sectionId}
                id={genderFieldId}
                onIdChange={update('genderFieldId')}
                suffix="gender-field"
                required={true}
                options={[
                    { value: "", label: "Select gender", disabled: true },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" }
                ]}
            />

            <BuilderInput
                label="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                isVisible={dobVisible !== false}
                onVisibilityChange={update('dobVisible')}
                sectionId={sectionId}
                id={dobFieldId}
                onIdChange={update('dobFieldId')}
                suffix="dob-field"
                required={true}
            />

            <BuilderSelect
                type="checkbox"
                name="marketingConsent"
                value={formData.marketingConsent}
                onChange={handleChange}
                isVisible={marketingConsentVisible}
                sectionId={sectionId}
                id={marketingConsentId}
                onIdChange={update('marketingConsentId')}
                suffix="marketing-consent"
                labelContent={mktLabel}
                onLabelChange={update('marketingConsentLabel')}
                containerClassName="form-group mt-xs"
                required={true}
            />

            <BuilderSelect
                type="checkbox"
                name="collectionConsent"
                value={formData.collectionConsent}
                onChange={handleChange}
                isVisible={collectionConsentVisible}
                sectionId={sectionId}
                id={collectionConsentId}
                onIdChange={update('collectionConsentId')}
                suffix="collection-consent"
                labelContent={collLabel}
                onLabelChange={update('collectionConsentLabel')}
                required={true}
            />

            {showSubmit && (
                <button type="submit" className="btn btn-primary btn-md w-full mt-xs" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <div className="spinner-sm" style={{ border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', width: '16px', height: '16px', animation: 'spin 1s linear infinite' }}></div>
                            <span>Submitting...</span>
                        </div>
                    ) : 'Submit'}
                </button>
            )}
        </form>
    );
}
