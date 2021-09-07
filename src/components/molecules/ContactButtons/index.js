// React Components and Hooks
import React from "react"

import {
  CHARTDATA_BASE_URL,
  EMAILER_BASE_URL,
} from "../../../core/environments"
// Material UI Components
import { makeStyles } from "@material-ui/core/styles"
import styled from "styled-components/macro"
import { IconButton, Box } from "@material-ui/core"
import { Reddit, Twitter, YouTube, Facebook } from "@material-ui/icons"
import PSButton from "../../atoms/PSButton"
import PSLink from "../../atoms/PSLink"
import PSDialog from "../PSDialog"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import PSLabel from "../../atoms/PSLabel"
import SearchIcon from "@material-ui/icons/Search"
import PropTypes from "prop-types"
import { spacing } from "@material-ui/system"
import {
  Grid,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Paper as MuiPaper,
  MenuItem,
  TextField as MuiTextField,
  Button,
  Card as MuiCard,
  CardContent,
  CircularProgress as MuiCircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  FormControl,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    // justifyContent: "center",
    // backgroundColor: theme.pallete.secondary,
  },
  buttonStyling: {
    color: theme.palette.secondary,
    textTransform: "none",
    backgroundColor: theme.palette.primary,
  },
  textboxStyling: {
    color: theme.palette.secondary,
    borderColor: theme.palette.secondary,
  },
  buttonsContainer: {
    display: "flex",
  },
}))

const TextField = styled(MuiTextField)(spacing)

const DEFAULT_BUG_REPORT = { name: "", email: "", message: "", type: "bug" }
const DEFAULT_BUSINESS_REPORT = {
  name: "",
  email: "",
  message: "",
  type: "business",
}

const ContactUsButtons = (props) => {
  const classes = useStyles()

  const [submissionAttempt, setSubmissionAttempt] = React.useState(false)

  const [businessContactForm, setBusinessContactForm] = React.useState(
    DEFAULT_BUSINESS_REPORT
  )
  const [bugReportContactForm, setBugReportContactForm] =
    React.useState(DEFAULT_BUG_REPORT)
  const [businessDialogOpen, setBusinessDialogOpen] = React.useState(false)
  const [bugReportDialogOpen, setBugReportDialogOpen] = React.useState(false)

  //Managing business contact form
  const submitBusinessContactForm = () => {
    SubmitCurrentForm(businessContactForm)
  }
  const submitBugReportContactForm = () => {
    SubmitCurrentForm(bugReportContactForm)
  }

  const SubmitCurrentForm = (form) => {
    if (form.name == "" || form.email == "" || form.message == "") {
      setSubmissionAttempt(true)
    } else {
      setBugReportDialogOpen(false)
      setBusinessDialogOpen(false)

      fetch(EMAILER_BASE_URL + "/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res) {
            console.log(response)
          }
          setSubmissionAttempt(false)
          setBugReportContactForm(DEFAULT_BUG_REPORT)
          setBusinessContactForm(DEFAULT_BUSINESS_REPORT)
        })
        .catch((e) => {
          // todo: handle err
          setSubmissionAttempt(false)
          setBugReportContactForm(DEFAULT_BUG_REPORT)
          setBusinessContactForm(DEFAULT_BUSINESS_REPORT)
        })
    }
  }

  const OnChangeBusinessContactForm = (event) => {
    let newBusinessFormState = businessContactForm
    newBusinessFormState[event.target.name] = event.target.value
    setBusinessContactForm(newBusinessFormState)
  }
  const OnChangeBugReportContactForm = (event) => {
    let newBugReportFormState = bugReportContactForm
    newBugReportFormState[event.target.name] = event.target.value
    setBugReportContactForm(newBugReportFormState)
  }

  const BusinessContactModalContent = () => {
    return (
      <>
        <Typography paragraph>
          Wanna work with us? Shoot us a message directly here:
        </Typography>
        <Box flexDirection="row">
          <FormControl
            className={classes.root}
            noValidate
            autoComplete="off"
            xs={12}
          >
            <div>
              <TextField
                className={classes.textboxStyling}
                my={2}
                fullWidth
                type="text"
                id="name"
                label="Name"
                defaultValue={businessContactForm.name}
                onChange={OnChangeBusinessContactForm}
                variant="outlined"
                error={businessContactForm.name === "" && submissionAttempt}
                name="name"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#fff" },
                }}
              />
              <TextField
                className={classes.textboxStyling}
                my={2}
                fullWidth
                type="text"
                id="email"
                label="Email Address"
                defaultValue={businessContactForm.email}
                onChange={OnChangeBusinessContactForm}
                variant="outlined"
                error={businessContactForm.email === "" && submissionAttempt}
                name="email"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#fff" },
                }}
              />
              <TextField
                className={classes.textboxStyling}
                my={2}
                fullWidth
                type="text"
                id="message"
                label="Message"
                defaultValue={businessContactForm.message}
                onChange={OnChangeBusinessContactForm}
                color="primary"
                multiline={true}
                rows={10}
                rowsMax={10}
                variant="outlined"
                error={businessContactForm.message === "" && submissionAttempt}
                name="message"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#fff" },
                }}
              />
            </div>
            <Grid container spacing={2}>
              <Grid item>
                <PSButton text={"Send"} onClick={submitBusinessContactForm} />
              </Grid>
              <Grid item>
                <PSButton
                  text={"Cancel"}
                  onClick={handleBusinessDialogClosing}
                />
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </>
    )
  }

  const BugReportContactModalContent = () => {
    return (
      <>
        <Typography paragraph>See a bug? Report it here:</Typography>
        <Box flexDirection="row">
          <FormControl
            className={classes.root}
            noValidate
            autoComplete="off"
            xs={12}
          >
            <div>
              <TextField
                className={classes.textboxStyling}
                my={2}
                fullWidth
                type="text"
                id="name"
                label="Name"
                defaultValue={bugReportContactForm.name}
                onChange={OnChangeBugReportContactForm}
                variant="outlined"
                error={bugReportContactForm.name === "" && submissionAttempt}
                name="name"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#fff" },
                }}
              />
              <TextField
                className={classes.textboxStyling}
                my={2}
                fullWidth
                type="text"
                id="email"
                label="Email Address"
                defaultValue={bugReportContactForm.email}
                onChange={OnChangeBugReportContactForm}
                variant="outlined"
                error={bugReportContactForm.email === "" && submissionAttempt}
                name="email"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#fff" },
                }}
              />
              <TextField
                className={classes.textboxStyling}
                my={2}
                fullWidth
                type="text"
                id="message"
                label="Message"
                defaultValue={bugReportContactForm.message}
                onChange={OnChangeBugReportContactForm}
                multiline={true}
                rows={10}
                rowsMax={10}
                variant="outlined"
                error={bugReportContactForm.message === "" && submissionAttempt}
                name="message"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#fff" },
                }}
              />
            </div>
            <div>
              <Grid container spacing={2}>
                <Grid item>
                  <PSButton
                    text={"Submit Bug"}
                    onClick={submitBugReportContactForm}
                  />
                </Grid>
                <Grid item>
                  <PSButton
                    ml={2}
                    text={"Cancel"}
                    onClick={handleBugReportDialogClosing}
                  />
                </Grid>
              </Grid>
            </div>
          </FormControl>
        </Box>
      </>
    )
  }

  //Managing business contact form
  const businessContactButtonClick = () => {
    setBusinessDialogOpen(true)
  }
  const handleBusinessDialogClosing = () => {
    setBusinessDialogOpen(false)
  }

  // Managing bug report form toggle
  const webAppBugContactButtonClick = () => {
    setBugReportDialogOpen(true)
  }
  const handleBugReportDialogClosing = () => {
    setBugReportDialogOpen(false)
  }

  return (
    <Box container xs={12}>
      <Grid container item xs={12} justify={"center"}>
        <Button
          className={classes.buttonStyling}
          onClick={businessContactButtonClick}
        >
          {" "}
          Business Inquisitions{" "}
        </Button>
      </Grid>
      <Grid container item xs={12} justify={"center"}>
        <Button
          className={classes.buttonStyling}
          onClick={webAppBugContactButtonClick}
        >
          {" "}
          App Blunders{" "}
        </Button>
      </Grid>
      <PSDialog
        open={businessDialogOpen}
        handleClose={handleBusinessDialogClosing}
        title={"Business Inquiries"}
        content={<BusinessContactModalContent />}
      />
      <PSDialog
        open={bugReportDialogOpen}
        handleClose={handleBugReportDialogClosing}
        title={"Bug Report"}
        content={<BugReportContactModalContent />}
      />
    </Box>
  )
}

export default ContactUsButtons
