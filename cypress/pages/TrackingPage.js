
const locators = {
    track_button: "body > div.container > div.form > button",
    id_field: "#trackingId",
    passwordfield: "#password",
    success_message: "body > div.message.success",
    error_message: "body > div.message.error",
    contentDiv: "#stages",
    stages: ".stage",
    done: ".done",
    pending: ".pending",
    rejected: ".rejected"
}

class credentialsPage {

    
    clickTrackButton(){
        return cy.get(locators.track_button).click(); 
    }
     
    enterId(id){
        return cy.get(locators.id_field).type(id);
    }

    enterPassword(password){
        return cy.get(locators.passwordfield).type(password);
    }

    checkSuccessMessage(message){
        return cy.get(locators.success_message).contains(message);
    }
    
    checkErrorMessage(message){
        return cy.get(locators.error_message).contains(message);
    }

    checkVisibilityBefore() {
        return cy.get(locators.contentDiv).should('not.be.visible');
    }
    

    checkVisibilityAfter(one, two, three, four, five, six, done, pending, rejected){
        const arr = [one, two, three, four, five, six]
        const commands =  [
            cy.get(locators.contentDiv).should('be.visible'),
            cy.get(locators.stages).should('have.length', 6),
            cy.get(locators.done).should('have.length', 6).contains(done),
            cy.get(locators.pending).should('have.length', 6).contains(pending),
            cy.get(locators.rejected).should('have.length', 6).contains(rejected),
            cy.get(locators.stages).should('be.visible')]
            for (let i = 0; i < 6; i++) {
                commands.push(cy.getHeader(i+1, arr[i]))
            }
            return commands
        
    }

    checkDisabledButtons(i){
        return (
            cy.get(locators.done).eq(i).should('be.disabled'),
            cy.get(locators.pending).eq(i).should('be.disabled'),
            cy.get(locators.rejected).eq(i).should('be.disabled')
        ) 
    }

    checkDisablePendingButton(i){
        return (
            cy.get(locators.done).eq(i).should('not.be.disabled'),
            cy.get(locators.pending).eq(i).should('be.disabled'),
            cy.get(locators.rejected).eq(i).should('not.be.disabled')
        ) 
    }
    
    checkDisableRejectedButton(i){
        return (
            cy.get(locators.done).eq(i).should('not.be.disabled'),
            cy.get(locators.pending).eq(i).should('not.be.disabled'),
            cy.get(locators.rejected).eq(i).should('be.disabled')
        ) 
    }

    checkRejectedState(i) {
        return cy.get('.rejected').eq(i).then(($rej) => {
            const isDisabled = $rej.prop('disabled');
            return isDisabled; // This value will be used in further chained commands
        });
    }
    



    clickRejectedButton(i){
        return (
            cy.get(locators.rejected).eq(i).should('not.be.disabled').click()
        )
    }

    clickPendingButton(i){
        return (
            cy.get(locators.pending).eq(i).should('not.be.disabled').click()
        )
    }

    clickDoneButton(i){
        return (
            cy.get(locators.done).eq(i).should('not.be.disabled').click()
        )
    }

    checkRejectedMessage(i){
        return cy.rejectedMessage(locators.success_message, i)
    }
    
    checkPendingMessage(i){
        return cy.pendingMessage(locators.success_message, i)
    }
    
    checkDone(i){
        return (
            cy.doneMessage(locators.success_message, i),
            cy.get(locators.done).eq(i).should('be.disabled')
        )
    }
}

export const cp = new credentialsPage();