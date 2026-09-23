document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const isEditMode = params.get("edit") === "true";

    /*
     * A normal visit to order.html starts a completely
     * new order. Only Edit Order is allowed to restore
     * the previous draft and its files.
     */
    if (!isEditMode) {
        sessionStorage.removeItem("splendidOrderDraft");
        sessionStorage.removeItem("splendidOrderFiles");
    }

    const serviceSelect = document.getElementById("service");

    const flexOptions = document.getElementById("flex-options");
    const flexPreset = document.getElementById("flex-preset");
    const customFlexSize = document.getElementById("custom-flex-size");

    const flyerOptions = document.getElementById("flyer-options");
    const flyerSize = document.getElementById("flyer-size");
    const customFlyerSize = document.getElementById("custom-flyer-size");

    const businessCardOptions =
        document.getElementById("business-card-options");

    const businessCardSize =
        document.getElementById("business-card-size");

    const customBusinessCardSize =
        document.getElementById("custom-business-card-size");

    const idCardOptions =
        document.getElementById("id-card-options");

    const invitationOptions =
        document.getElementById("invitation-options");

    const printingOptions =
        document.getElementById("printing-options");

    const socialMediaOptions =
        document.getElementById("social-media-options");

    const stickerLabelOptions =
        document.getElementById("sticker-label-options");

    const logoBrandingOptions =
        document.getElementById("logo-branding-options");

    const brochureOptions =
        document.getElementById("brochure-options");

    const churchMaterialOptions =
        document.getElementById("church-material-options");

    const graphicDesignOptions =
        document.getElementById("graphic-design-options");

    const customRequestOptions =
        document.getElementById("custom-request-options");

    const graphicDesignSize =
        document.getElementById("graphic-design-size");

    const customGraphicDesignSize =
        document.getElementById("custom-graphic-design-size");

    const churchSize =
        document.getElementById("church-size");

    const customChurchSize =
        document.getElementById("custom-church-size");

    const brochureSize =
        document.getElementById("brochure-size");

    const customBrochureSize =
        document.getElementById("custom-brochure-size");

    const stickerSize =
        document.getElementById("sticker-size");

    const customStickerSize =
        document.getElementById("custom-sticker-size");

    const printingSize =
        document.getElementById("printing-size");

    const customPrintingSize =
        document.getElementById("custom-printing-size");

    const invitationSize =
        document.getElementById("invitation-size");

    const customInvitationSize =
        document.getElementById("custom-invitation-size");


    function updateServiceOptions() {

        const service = serviceSelect.value;


        // Hide everything first

        if (flexOptions) {
            flexOptions.hidden = true;
        }

        if (flyerOptions) {
            flyerOptions.hidden = true;
        }

        if (businessCardOptions) {
            businessCardOptions.hidden = true;
        }

        if (idCardOptions) {
            idCardOptions.hidden = true;
        }

        if (invitationOptions) {
            invitationOptions.hidden = true;
        }

        if (printingOptions) {
            printingOptions.hidden = true;
        }

        if (socialMediaOptions) {
            socialMediaOptions.hidden = true;
        }

        if (stickerLabelOptions) {
            stickerLabelOptions.hidden = true;
        }

        if (logoBrandingOptions) {
            logoBrandingOptions.hidden = true;
        }

        if (brochureOptions) {
            brochureOptions.hidden = true;
        }

        if (churchMaterialOptions) {
            churchMaterialOptions.hidden = true;
        }

        if (graphicDesignOptions) {
            graphicDesignOptions.hidden = true;
        }

        if (customRequestOptions) {
            customRequestOptions.hidden = true;
        }


        // FLEX & BANNERS

        if (service === "flex-banner") {

            if (flexOptions) {
                flexOptions.hidden = false;
            }

        }


        // FLYERS & HANDBILLS

        if (service === "flyer-handbill") {

            if (flyerOptions) {
                flyerOptions.hidden = false;
            }

        }


        // BUSINESS CARDS

        if (service === "business-card") {

            if (businessCardOptions) {
                businessCardOptions.hidden = false;
            }

        }


        // ID CARDS

        if (service === "id-card") {

            if (idCardOptions) {
                idCardOptions.hidden = false;
            }

        }


        // INVITATION CARDS

        if (service === "invitation-card") {

            if (invitationOptions) {
                invitationOptions.hidden = false;
            }

        }


        // PRINTING

        if (service === "printing") {

            if (printingOptions) {
                printingOptions.hidden = false;
            }

        }


        // SOCIAL MEDIA GRAPHICS

        if (service === "social-media") {

            if (socialMediaOptions) {
                socialMediaOptions.hidden = false;
            }

        }


        // STICKERS & LABELS

        if (service === "sticker-label") {

            if (stickerLabelOptions) {
                stickerLabelOptions.hidden = false;
            }

        }


        // LOGO & BRANDING

        if (service === "logo-branding") {

            if (logoBrandingOptions) {
                logoBrandingOptions.hidden = false;
            }

        }


        // BROCHURES

        if (service === "brochure") {

            if (brochureOptions) {
                brochureOptions.hidden = false;
            }

        }


        // CHURCH MATERIALS

        if (service === "church-material") {

            if (churchMaterialOptions) {
                churchMaterialOptions.hidden = false;
            }

        }


        // GRAPHIC DESIGN

        if (service === "graphic-design") {

            if (graphicDesignOptions) {
                graphicDesignOptions.hidden = false;
            }

        }


        // I DON'T KNOW WHAT I NEED

        if (service === "custom-request") {

            if (customRequestOptions) {
                customRequestOptions.hidden = false;
            }

        }

    }


    // Service manually changed

    if (serviceSelect) {

        serviceSelect.addEventListener(
            "change",
            updateServiceOptions
        );

    }


    // Flex custom size

    if (flexPreset) {

        flexPreset.addEventListener("change", () => {

            if (customFlexSize) {
                customFlexSize.hidden =
                    flexPreset.value !== "custom";
            }

        });

    }


    // Flyer custom size

    if (flyerSize) {

        flyerSize.addEventListener("change", () => {

            if (customFlyerSize) {
                customFlyerSize.hidden =
                    flyerSize.value !== "custom";
            }

        });

    }


    // Business Card custom size

    if (businessCardSize) {

        businessCardSize.addEventListener("change", () => {

            if (customBusinessCardSize) {
                customBusinessCardSize.hidden =
                    businessCardSize.value !== "custom";
            }

        });

    }


    // Invitation custom size

    if (invitationSize) {

        invitationSize.addEventListener("change", () => {

            if (customInvitationSize) {
                customInvitationSize.hidden =
                    invitationSize.value !== "custom";
            }

        });

    }


    // Graphic Design custom size
    if (graphicDesignSize) {
        graphicDesignSize.addEventListener("change", () => {
            if (customGraphicDesignSize) {
                customGraphicDesignSize.hidden =
                    graphicDesignSize.value !== "custom";
            }
        });
    }

    // Church custom size
    if (churchSize) {
        churchSize.addEventListener("change", () => {
            if (customChurchSize) {
                customChurchSize.hidden =
                    churchSize.value !== "custom";
            }
        });
    }

    // Brochure custom size
    if (brochureSize) {
        brochureSize.addEventListener("change", () => {
            if (customBrochureSize) {
                customBrochureSize.hidden =
                    brochureSize.value !== "custom";
            }
        });
    }

    // Sticker custom size
    if (stickerSize) {
        stickerSize.addEventListener("change", () => {
            if (customStickerSize) {
                customStickerSize.hidden =
                    stickerSize.value !== "custom";
            }
        });
    }

    // Printing custom size
    if (printingSize) {
        printingSize.addEventListener("change", () => {
            if (customPrintingSize) {
                customPrintingSize.hidden =
                    printingSize.value !== "custom";
            }
        });
    }

    // Service passed from Services page

    const serviceFromUrl = params.get("service");

    if (serviceFromUrl && serviceSelect) {
        serviceSelect.value = serviceFromUrl;
    }


    // Run once when page loads

    if (serviceSelect) {
        updateServiceOptions();
    }

});

/* =========================================
   ORDER FILE UPLOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const orderFiles =
        document.getElementById("order-files");

    const selectedFiles =
        document.getElementById("selected-files");

    if (!orderFiles || !selectedFiles) {
        return;
    }

    let filesList = [];

    try {

        const savedFiles =
            JSON.parse(
                sessionStorage.getItem(
                    "splendidOrderFiles"
                ) || "[]"
            );

        if (Array.isArray(savedFiles)) {

            filesList =
                savedFiles.map((file) => ({
                    name: file.name || "",
                    type: file.type || "",
                    size: Number(file.size || 0),
                    filename: file.filename || "",
                    path: file.path || "",
                    uploaded: Boolean(
                        file.filename &&
                        file.path
                    ),
                    restored: true
                }));
        }

    } catch (error) {

        console.warn(
            "Unable to restore saved order files:",
            error
        );

        filesList = [];
    }


    function formatFileSize(bytes) {

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    }


    function saveFiles() {

        sessionStorage.setItem(
            "splendidOrderFiles",
            JSON.stringify(
                filesList
                    .filter(
                        (file) =>
                            file.uploaded
                    )
                    .map((file) => ({
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        filename: file.filename,
                        path: file.path
                    }))
            )
        );
    }


    function renderFiles() {

        selectedFiles.innerHTML = "";

        saveFiles();


        filesList.forEach((file, index) => {

            const fileItem =
                document.createElement("div");

            fileItem.className =
                "selected-file-item";


            const preview =
                document.createElement("div");

            preview.className =
                "selected-file-preview";


            if (
                file.type &&
                file.type.startsWith("image/") &&
                file.file instanceof File
            ) {

                const image =
                    document.createElement("img");

                image.alt =
                    file.name;

                image.loading =
                    "eager";


                const reader =
                    new FileReader();

                reader.onload =
                    (event) => {

                        image.src =
                            event.target.result;
                    };

                reader.readAsDataURL(
                    file.file
                );

                preview.appendChild(
                    image
                );

            } else {

                const icon =
                    document.createElement(
                        "ion-icon"
                    );


                if (
                    file.type ===
                    "application/pdf"
                ) {

                    icon.setAttribute(
                        "name",
                        "document-text-outline"
                    );

                } else {

                    icon.setAttribute(
                        "name",
                        "document-outline"
                    );
                }


                preview.appendChild(
                    icon
                );
            }


            const fileInfo =
                document.createElement("div");

            fileInfo.className =
                "selected-file-info";


            const fileName =
                document.createElement("span");

            fileName.textContent =
                file.name;


            const fileSize =
                document.createElement("small");

            fileSize.textContent =
                formatFileSize(
                    file.size
                );


            fileInfo.appendChild(
                fileName
            );

            fileInfo.appendChild(
                fileSize
            );


            const removeButton =
                document.createElement("button");

            removeButton.type =
                "button";

            removeButton.className =
                "remove-selected-file";

            removeButton.setAttribute(
                "aria-label",
                `Remove ${file.name}`
            );

            removeButton.innerHTML =
                '<ion-icon name="close-outline"></ion-icon>';


            removeButton.addEventListener(
                "click",
                () => {

                    filesList.splice(
                        index,
                        1
                    );

                    renderFiles();
                }
            );


            fileItem.appendChild(
                preview
            );

            fileItem.appendChild(
                fileInfo
            );

            fileItem.appendChild(
                removeButton
            );

            selectedFiles.appendChild(
                fileItem
            );
        });
    }


    async function uploadFile(file) {

        const formData =
            new FormData();

        formData.append(
            "files",
            file
        );


        const response =
            await fetch(
                "/api/orders/upload",
                {
                    method: "POST",
                    body: formData
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success ||
            !Array.isArray(data.files) ||
            !data.files.length
        ) {

            throw new Error(
                data.message ||
                "Unable to upload file."
            );
        }


        return data.files[0];
    }


    renderFiles();


    orderFiles.addEventListener(
        "change",
        async () => {

            const newFiles =
                Array.from(
                    orderFiles.files
                );


            orderFiles.value = "";


            for (
                const file of newFiles
            ) {

                const alreadyAdded =
                    filesList.some(
                        (existingFile) =>
                            existingFile.name ===
                                file.name &&
                            existingFile.size ===
                                file.size &&
                            existingFile.lastModified ===
                                file.lastModified
                    );


                if (alreadyAdded) {
                    continue;
                }


                /*
                 * Add the local file immediately
                 * so the customer sees it.
                 */
                const localFile = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    lastModified:
                        file.lastModified,
                    file,
                    uploaded: false
                };


                filesList.push(
                    localFile
                );

                renderFiles();


                /*
                 * Upload the real file.
                 */
                try {

                    const uploaded =
                        await uploadFile(
                            file
                        );


                    localFile.filename =
                        uploaded.filename;

                    localFile.path =
                        uploaded.path;

                    localFile.name =
                        uploaded.name;

                    localFile.type =
                        uploaded.type;

                    localFile.size =
                        uploaded.size;

                    localFile.uploaded =
                        true;

                    localFile.file =
                        file;

                    renderFiles();

                } catch (error) {

                    console.error(
                        "File upload error:",
                        error
                    );


                    const failedIndex =
                        filesList.indexOf(
                            localFile
                        );


                    if (
                        failedIndex !== -1
                    ) {

                        filesList.splice(
                            failedIndex,
                            1
                        );
                    }


                    renderFiles();


                    alert(
                        `Unable to upload "${file.name}". Please try again.`
                    );
                }
            }
        }
    );

});


/* =========================================
   REVIEW PAGE — SAVE ORDER DRAFT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const orderForm = document.getElementById("orderForm");

    if (!orderForm) return;

    orderForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const draft = {};

        /*
         * Main order fields
         */
        const service = document.getElementById("service");
        const description = document.getElementById("description");

        if (service) {
            draft.service = service.value;
        }

        if (description) {
            draft.description = description.value;
        }

        /*
         * Order type
         */
        const selectedOrderType = document.querySelector(
            'input[name="orderType"]:checked'
        );

        if (selectedOrderType) {
            draft.orderType = selectedOrderType.value;
        }

        /*
         * Find the currently visible service-specific section.
         */
        const serviceSections = document.querySelectorAll(
            ".dynamic-order-options"
        );

        let activeSection = null;

        serviceSections.forEach((section) => {
            if (!section.hidden) {
                activeSection = section;
            }
        });

        /*
         * Collect all useful fields from the active service section.
         */
        if (activeSection) {
            const details = [];

            const fields = activeSection.querySelectorAll(
                "input, select, textarea"
            );

            fields.forEach((field) => {
                if (!field.id) return;

                /*
                 * Skip hidden custom-size fields when their container
                 * is hidden.
                 */
                const hiddenParent = field.closest("[hidden]");

                if (hiddenParent && hiddenParent !== activeSection) {
                    return;
                }

                /*
                 * Skip unchecked radio/checkbox inputs.
                 */
                if (
                    (field.type === "radio" ||
                        field.type === "checkbox") &&
                    !field.checked
                ) {
                    return;
                }

                let value = field.value;

                if (
                    value === "" ||
                    value === null ||
                    value === undefined
                ) {
                    return;
                }

                /*
                 * Get the human-readable label/value where possible.
                 */
                let label = field.id;

                const fieldLabel = activeSection.querySelector(
                    `label[for="${field.id}"]`
                );

                if (fieldLabel) {
                    label = fieldLabel.textContent.trim();
                } else if (field.tagName === "SELECT") {
                    const selectedOption =
                        field.options[field.selectedIndex];

                    if (selectedOption) {
                        label = selectedOption.parentElement?.label ||
                            field.id;
                    }
                }

                if (field.tagName === "SELECT") {
                    const selectedOption =
                        field.options[field.selectedIndex];

                    if (selectedOption) {
                        value = selectedOption.textContent.trim();
                    }
                }

                details.push({
                    label,
                    value
                });
            });

            draft.serviceDetails = details;

            /*
             * Save the actual form field state too.
             * This is what allows Edit Order to restore
             * quantities, selections, checkboxes, etc.
             */
            draft.fieldValues = {};

            fields.forEach((field) => {
                if (!field.id) return;

                const hiddenParent =
                    field.closest("[hidden]");

                if (
                    hiddenParent &&
                    hiddenParent !== activeSection
                ) {
                    return;
                }

                if (
                    field.type === "radio" ||
                    field.type === "checkbox"
                ) {
                    draft.fieldValues[field.id] = {
                        type: field.type,
                        value: field.value,
                        checked: field.checked
                    };
                } else {
                    draft.fieldValues[field.id] = {
                        type: field.type,
                        value: field.value
                    };
                }
            });
        }

        /*
         * Uploaded files.
         *
         * The files have already been uploaded to the backend
         * when they were selected. At this point we only restore
         * the uploaded file metadata for the review page.
         */
        let savedFiles = [];

        try {

            savedFiles =
                JSON.parse(
                    sessionStorage.getItem(
                        "splendidOrderFiles"
                    ) || "[]"
                );

        } catch (error) {

            savedFiles = [];
        }

        draft.files =
            Array.isArray(savedFiles)
                ? savedFiles
                : [];

        sessionStorage.setItem(
            "splendidOrderFiles",
            JSON.stringify(draft.files)
        );

        sessionStorage.setItem(
            "splendidOrderDraft",
            JSON.stringify(draft)
        );

        window.location.href = "review-order.html";
    });
});


/* =========================================
   EDIT ORDER — RESTORE SAVED DRAFT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const params =
        new URLSearchParams(window.location.search);

    const isEditMode =
        params.get("edit") === "true";

    const orderForm =
        document.getElementById("orderForm");

    const serviceSelect =
        document.getElementById("service");

    if (!orderForm || !serviceSelect) {
        return;
    }

    let draft = null;

    try {
        draft = JSON.parse(
            sessionStorage.getItem(
                "splendidOrderDraft"
            ) || "null"
        );
    } catch (error) {
        console.warn(
            "Unable to restore order draft:",
            error
        );
        return;
    }

    if (!draft) {
        return;
    }

    /*
     * Only restore a saved draft when the page
     * was opened through Edit Order.
     */
    if (!isEditMode) {
        sessionStorage.removeItem("splendidOrderDraft");
        sessionStorage.removeItem("splendidOrderFiles");
        return;
    }

    /*
     * Restore the selected service first.
     * The change event reveals the correct
     * service-specific section.
     */
    if (draft.service) {

        serviceSelect.value =
            draft.service;

        serviceSelect.dispatchEvent(
            new Event("change", {
                bubbles: true
            })
        );
    }

    /*
     * Restore description.
     */
    const description =
        document.getElementById("description");

    if (
        description &&
        typeof draft.description === "string"
    ) {
        description.value =
            draft.description;
    }

    /*
     * Restore order type.
     */
    if (draft.orderType) {

        const orderType =
            document.querySelectorAll(
                'input[name="orderType"]'
            );

        orderType.forEach((input) => {

            input.checked =
                input.value === draft.orderType;

        });
    }

    /*
     * Restore service-specific fields.
     *
     * fieldValues contains the real field IDs,
     * so this restores quantities and selections
     * instead of trying to guess from labels.
     */
    if (
        draft.fieldValues &&
        typeof draft.fieldValues === "object"
    ) {

        Object.entries(
            draft.fieldValues
        ).forEach(([id, saved]) => {

            const field =
                document.getElementById(id);

            if (!field || !saved) {
                return;
            }

            if (
                field.type === "radio" ||
                field.type === "checkbox"
            ) {

                field.checked =
                    Boolean(saved.checked);

            } else {

                field.value =
                    saved.value ?? "";
            }

            /*
             * Trigger change so any dependent
             * controls update themselves.
             */
            field.dispatchEvent(
                new Event("change", {
                    bubbles: true
                })
            );

        });
    }

});
