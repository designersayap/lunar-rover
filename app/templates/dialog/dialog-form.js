"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import DialogSection from "./dialog-section";
import { createUpdateHandler } from "../utils/component-helpers";
import BuilderInput from "../../page-builder/utils/builder/builder-input";
import BuilderSelect from "../../page-builder/utils/builder/builder-select";

export default function DialogForm({
    title = "Title",
    description = "Description",
    isOpen,
    onUpdate,
    sectionId,

    className = "",
    image,
    imageId,
    imageVisible = true,
    imageUrl,
    imageLinkType,
    imageTargetDialogId,
    marketingConsentLabel = "I agree to receive information about exciting offers, product updates, and other information from [brand_name] and other Wings brands.",
    collectionConsentLabel = "I agree to allow Wings to manage my personal data in accordance with the Wings Privacy Policy.",
    brandName = "Lunar",
    pageTitle = "",
    nameVisible = true,
    emailVisible = true,
    whatsappVisible = true,
    genderVisible = true,
    dobVisible = true,
    marketingConsentVisible = true,
    collectionConsentVisible = true,
    nameFieldId = "",
    emailFieldId = "",
    whatsappFieldId = "",
    genderFieldId = "",
    dobFieldId = "",
    marketingConsentId = "",
    collectionConsentId = ""
}) {
    const update = createUpdateHandler(onUpdate);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsappNumber: '',
        gender: '',
        dob: '',
        marketingConsent: false,
        collectionConsent: false
    });

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

        const genderMap = { 'male': 'M', 'female': 'F', 'other': 'other' };
        const now = new Date();
        const createdDate = now.toISOString().replace('T', ' ').split('.')[0];

        const submissionData = {
            "collectionConsent": formData.collectionConsent,
            "marketingConsent": formData.marketingConsent,
            "event": `Website Tactical - ${brandName} ${pageTitle}`.trim(),
            "brand": brandName,
            "product": "null",
            "firstName": formData.name,
            "lastName": "null",
            "whatsappNumber": `62${formData.whatsappNumber}`,
            "whatsappNumberValidated": "null",
            "email": formData.email,
            "gender": genderMap[formData.gender] || formData.gender,
            "maritalStatus": "null",
            "dob": formData.dob,
            "age": calculateAge(formData.dob),
            "city": "null",
            "address": "null",
            "createdDate": createdDate,
            "updateDate": "null",
            "Hobby": "null",
            "FavoriteColor": "null",
            "MembershipLevel": "null",
            "Country": "null",
            "Language": "null",
            "Device": getDeviceType(),
            "OS": "null",
            "AppVersion": "null",
            "ReferralCode": "null",
            "Campaign": "null"
        };

        console.log('Form data to be sent to Snowflake:', submissionData);
        toast.success("Form submitted successfully!");

        if (onUpdate) {
            onUpdate({ isOpen: false });
        }
    };

    return (
        <DialogSection
            title={title}
            description={description}
            isOpen={isOpen}
            onUpdate={onUpdate}
            sectionId={sectionId}
            className={className}
            image={image}
            imageId={imageId}
            imageVisible={imageVisible}
            imageUrl={imageUrl}
            imageLinkType={imageLinkType}
            imageTargetDialogId={imageTargetDialogId}
        >
            <form className="form-container px-md pb-md" onSubmit={handleSubmit}>
                <BuilderInput
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    isVisible={nameVisible}
                    sectionId={sectionId}
                    id={nameFieldId}
                    onIdChange={update('nameFieldId')}
                    suffix="name-field"
                />

                <BuilderInput
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                    isVisible={emailVisible}
                    sectionId={sectionId}
                    id={emailFieldId}
                    onIdChange={update('emailFieldId')}
                    suffix="email-field"
                />

                <BuilderInput
                    label="WhatsApp Number"
                    type="tel"
                    name="whatsappNumber"
                    placeholder="812 3456 7890"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    isVisible={whatsappVisible}
                    sectionId={sectionId}
                    id={whatsappFieldId}
                    onIdChange={update('whatsappFieldId')}
                    suffix="whatsapp-field"
                    inputMode="numeric"
                    pattern="[0-9]*"
                >
                    <span className="form-prefix">+62</span>
                </BuilderInput>

                <BuilderSelect
                    label="Gender"
                    type="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    isVisible={genderVisible}
                    sectionId={sectionId}
                    id={genderFieldId}
                    onIdChange={update('genderFieldId')}
                    suffix="gender-field"
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
                    isVisible={dobVisible}
                    sectionId={sectionId}
                    id={dobFieldId}
                    onIdChange={update('dobFieldId')}
                    suffix="dob-field"
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
                    labelContent={marketingConsentLabel}
                    onLabelChange={update('marketingConsentLabel')}
                    containerClassName="form-group mt-xs"
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
                    labelContent={collectionConsentLabel}
                    onLabelChange={update('collectionConsentLabel')}
                    required
                />

                <button type="submit" className="btn btn-primary btn-md w-full mt-xs">
                    Submit
                </button>
            </form>
        </DialogSection>
    );
}
