import { useState } from "react";
import { Flex, Input, Button, Typography, Steps } from "antd";
import { onboardUser } from "../api/onboarding";
import { useAuth0 } from "@auth0/auth0-react";

interface OnBoardingProps {
  setNewUser: (newUser: boolean) => void;
};

const OnBoarding = ({ setNewUser }: OnBoardingProps) => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  const handleNext = () => {
    if (step === 1 && !userName.trim()) {
      setError("Please enter your name");
      return;
    }
    if (step === 2 && !companyName.trim()) {
      setError("Please enter your company name");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleSubmit = async (desc: string) => {
    setError("");
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      await onboardUser(token, userName, companyName, desc);
      setNewUser(false);
    } catch {
      setError("Failed to onboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      vertical
      align="center"
      gap={24}
      justify="center"
      style={{
        width: 800,
        margin: "0 auto",
        height: "100vh"
      }}
    >
      <Steps
        current={step - 1}
        style={{ width: "100%", marginBottom: 16 }}
        items={[
          { title: "Your Name", description: <><span style={{ fontSize: 12, color: '#888' }}>Let's get to know you!</span></> },
          { title: "Company Name", description: <><span style={{ fontSize: 12, color: '#888' }}>Your organization</span></> },
          { title: "Description", description: <><span style={{ fontSize: 12, color: '#888' }}>Tell us more (optional)</span></> },
        ]}
      />
      <Flex vertical align="center" gap={16} style={{ width: 520, background: '#fff', borderRadius: 12, padding: 32 }}>
        <Typography.Title level={3} style={{ marginBottom: 0, color: "#382ee5", fontWeight: 700, fontSize: 28 }}>
          {step === 1 ? "Welcome to PredictGrowth!" : step === 2 ? "Company Name" : "Company Description"}
        </Typography.Title>
        <Typography.Text style={{ color: "#64748b", fontSize: 16, marginBottom: 8, textAlign: "center" }}>
          {step === 1
            ? "We're excited to have you on board. Let's start by getting your name so we can personalize your experience."
            : step === 2
              ? "What's the name of your company or organization?"
              : "Describe your company in a few words. This helps us tailor insights and recommendations just for you! (Optional)"}
        </Typography.Text>
        {step === 1 && (
          <>
            <Input
              placeholder="Enter your full name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              onPressEnter={handleNext}
              autoFocus
              size="large"
            />
            <Button type="primary" onClick={handleNext} block size="large" style={{ fontWeight: 600, letterSpacing: 1 }}>
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <Input
              placeholder="Enter your company name"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              onPressEnter={handleNext}
              autoFocus
              size="large"
            />
            <Button type="primary" onClick={handleNext} block size="large" style={{ fontWeight: 600 }}>
              Next
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <Input.TextArea
              placeholder="Describe your company (optional, but helps us help you!)"
              value={companyDescription}
              onChange={e => setCompanyDescription(e.target.value)}
              style={{ minHeight: 64 }}
              size="large"
              autoFocus
            />
            <Flex gap={8} style={{ width: "100%" }}>
              <Button
                type="primary"
                onClick={() => handleSubmit(companyDescription)}
                loading={loading}
                block
                size="large"
                style={{ fontWeight: 600 }}
              >
                {companyDescription.trim() ? "Submit" : "Skip & Submit"}
              </Button>
            </Flex>
          </>
        )}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </Flex>
    </Flex>
  );
};

export default OnBoarding;
