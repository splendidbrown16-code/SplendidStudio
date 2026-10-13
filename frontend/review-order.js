document.addEventListener("DOMContentLoaded", () => {

    const savedDraft =
        sessionStorage.getItem("splendidOrderDraft");

    if (!savedDraft) {
        return;
    }

    let draft;

    try {
        draft = JSON.parse(savedDraft);
    } catch (error) {
        console.error(
            "Unable to read order draft:",
            error
        );
        return;
    }


    const serviceNames = {
        "graphic-design": "Graphic Design",
        "printing": "Printing",
        "flex-banner": "Flex & Banners",
        "flyer-handbill": "Flyers & Handbills",
        "business-card": "Business Cards",
        "id-card": "ID Cards",
        "invitation-card": "Invitation Cards",
        "social-media": "Social Media Graphics",
        "sticker-label": "Stickers & Labels",
        "logo-branding": "Logo & Branding",
        "brochure": "Brochures",
        "church-material": "Church Materials",
        "custom": "I Don't Know What I Need",
        "custom-request": "I Don't Know What I Need"
    };


    const orderTypeNames = {
        "design": "Design Only",

        "design-print":
            "Design + Printing",

        "design-print-delivery":
            "Design + Printing + Delivery"
    };


    /* --------------------------------
       NORMAL REVIEW CONTENT
    -------------------------------- */

    const serviceElement =
        document.getElementById("review-service");

    if (serviceElement) {

        serviceElement.textContent =
            serviceNames[draft.service] ||
            "Not selected";
    }


    const orderTypeElement =
        document.getElementById("review-order-type");

    if (orderTypeElement) {

        orderTypeElement.textContent =
            orderTypeNames[draft.orderType] ||
            draft.orderType ||
            "Not selected";
    }


    const descriptionElement =
        document.getElementById("review-description");

    if (descriptionElement) {

        descriptionElement.textContent =
            draft.description?.trim() ||
            "Not provided";
    }


    const filesElement =
        document.getElementById("review-files");

    if (filesElement) {

        filesElement.innerHTML = "";

        let files = [];

        const savedFiles =
            sessionStorage.getItem(
                "splendidOrderFiles"
            );

        if (savedFiles) {

            try {

                files = JSON.parse(savedFiles);

            } catch (error) {

                console.error(
                    "Unable to read saved files:",
                    error
                );
            }
        }


        if (!files.length) {

            filesElement.innerHTML =
                "<p>No files attached.</p>";

        } else {

            files.forEach((file) => {

                const item =
                    document.createElement("div");

                item.className =
                    "review-file-item";


                const icon =
                    document.createElement("ion-icon");

                icon.name =
                    file.type?.startsWith("image/")
                        ? "image-outline"
                        : "document-outline";


                const name =
                    document.createElement("span");

                name.textContent =
                    file.name;


                item.appendChild(icon);
                item.appendChild(name);

                filesElement.appendChild(item);

            });
        }
    }


    /* --------------------------------
       BUTTONS / STATES
    -------------------------------- */

    const submitButton =
        document.getElementById(
            "submit-order-btn"
        );

    const reviewState =
        document.getElementById(
            "review-state"
        );

    const submittedState =
        document.getElementById(
            "submitted-state"
        );

    const talkDesignerButton =
        document.getElementById(
            "talk-designer-btn"
        );


    if (!submitButton) {
        return;
    }


    /* --------------------------------
       OPEN WHATSAPP
    -------------------------------- */

    const openDesignerChat =
        (orderId) => {

            const message =
                encodeURIComponent(
                    `Hello, I just submitted an order to Splendid Studio.\n\nOrder ID: ${orderId}\n\nI'd like to continue discussing my order with the designer.`
                );


            window.open(
                `https://wa.me/2348129762370?text=${message}`,
                "_blank"
            );
        };


    /* --------------------------------
       SUBMIT ORDER
    -------------------------------- */

    submitButton.addEventListener(
        "click",
        async () => {

            submitButton.disabled = true;


            submitButton.innerHTML = `
                <span>Submitting...</span>
                <ion-icon name="sync-outline"></ion-icon>
            `;


            let files = [];

            const savedFiles =
                sessionStorage.getItem(
                    "splendidOrderFiles"
                );


            if (savedFiles) {

                try {

                    files =
                        JSON.parse(savedFiles);

                } catch (error) {

                    files = [];
                }
            }


            try {

                const token =
                    localStorage.getItem("splendidToken");

                if (!token) {
                    window.location.href = "login.html";
                    return;
                }

                const response =
                    await fetch(
                        "/api/orders",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`
                            },

                            body:
                                JSON.stringify({
                                    service:
                                        draft.service ||
                                        "",

                                    orderType:
                                        draft.orderType ||
                                        "",

                                    description:
                                        draft.description ||
                                        "",

                                    files
                                })
                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to submit order."
                    );
                }


                const orderId =
                    data.order.id;


                sessionStorage.setItem(
                    "splendidOrderId",
                    orderId
                );


                /* -----------------------------
                   SUCCESS TRANSITION
                ----------------------------- */

                if (reviewState) {

                    reviewState.classList.add(
                        "review-submitted"
                    );


                    setTimeout(() => {

                        reviewState.style.display =
                            "none";

                    }, 450);
                }


                if (submittedState) {

                    submittedState.classList.add(
                        "show-submitted"
                    );

                    submittedState.setAttribute(
                        "aria-hidden",
                        "false"
                    );
                }


                /* -----------------------------
                   WHATSAPP BUTTON
                ----------------------------- */

                if (talkDesignerButton) {

                    talkDesignerButton.onclick =
                        () => {
                            openDesignerChat(
                                orderId
                            );
                        };
                }


                if (
                    typeof showToast ===
                    "function"
                ) {

                    showToast(
                        "Order Submitted",
                        "Your order has been received successfully.",
                        "success"
                    );
                }


            } catch (error) {

                console.error(
                    "Submit order error:",
                    error
                );


                submitButton.disabled =
                    false;


                submitButton.innerHTML = `
                    <span>Try Again</span>
                    <ion-icon name="refresh-outline"></ion-icon>
                `;


                if (
                    typeof showToast ===
                    "function"
                ) {

                    showToast(
                        "Submission Failed",
                        error.message ||
                        "Unable to submit order.",
                        "error"
                    );
                }
            }
        }
    );

});
