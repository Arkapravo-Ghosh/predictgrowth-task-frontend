import { useState, useEffect } from "react";
import { Flex, Button, Dropdown, Menu, Modal, Input, Typography, Skeleton } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { editUserProfile } from "../api/user";
import { fetchUserData } from "../utils/authUtils";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialProfile, setInitialProfile] = useState({ name: "", company: "", description: "" });
  const { getAccessTokenSilently } = useAuth0();

  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);

  const handleProfileSave = async () => {
    setLoading(true);
    setError("");
    try {
      const token = await getAccessTokenSilently();
      await editUserProfile(token, { name, company, company_description: description });
      setProfileOpen(false);
    } catch {
      setError("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileOpen) {
      setProfileLoading(true);
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          const user = await fetchUserData(token);
          setName(user.name || "");
          setCompany(user.company || "");
          setDescription(user.company_description || "");
          setInitialProfile({
            name: user.name || "",
            company: user.company || "",
            description: user.company_description || ""
          });
        } catch {
          setName("");
          setCompany("");
          setDescription("");
          setInitialProfile({ name: "", company: "", description: "" });
        } finally {
          setProfileLoading(false);
        }
      })();
    }
  }, [profileOpen, getAccessTokenSilently]);

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={handleProfileOpen}>
        Profile
      </Menu.Item>
    </Menu>
  );

  return (
    <Flex style={{ width: "100%", padding: 0, background: "none", boxShadow: "none", position: "fixed", top: 0, left: 0, zIndex: 100 }} justify="end" align="center">
      {loading && profileOpen ? (
        <Skeleton.Avatar active size={32} style={{ margin: 16 }} />
      ) : (
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <Button type="text" icon={<SettingOutlined />} style={{ fontSize: 22, margin: 16 }} />
        </Dropdown>
      )}
      <Modal
        title="Edit Profile"
        open={profileOpen}
        onCancel={handleProfileClose}
        onOk={handleProfileSave}
        confirmLoading={loading}
        okText="Save"
        okButtonProps={{
          disabled:
            name === initialProfile.name &&
            company === initialProfile.company &&
            description === initialProfile.description
        }}
      >
        <div style={{ marginBottom: 20 }} />
        {profileLoading ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : (
          <Flex vertical gap={16}>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" />
            <Input.TextArea value={description} onChange={e => setDescription(e.target.value)} placeholder="Company Description" />
            {error && <Typography.Text type="danger">{error}</Typography.Text>}
          </Flex>
        )}
      </Modal>
    </Flex>
  );
};

export default Navbar;
