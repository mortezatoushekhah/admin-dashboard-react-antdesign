import { Avatar, Badge, Drawer, Image, List, Space, Typography } from "antd";
import {
  BellFilled,
  CommentOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getComment } from "../../API/Api";

const Header = () => {
  const [openComment, setOpenComment] = useState(false);
  const [commentNumber, setCommentNumber] = useState(0);
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    getComment().then((res) => {
      setCommentNumber(res.total);
      setcomments(res.comments);
    });
  }, []);
  return (
    <div className="header">
      <Image
        src="https://upload.wikimedia.org/wikipedia/en/archive/5/57/20170414032240%21Base_CRM_logo.png"
        width={200}
      ></Image>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <Space>
        <Badge count={commentNumber}>
          <CommentOutlined
            style={{ fontSize: 24 }}
            onClick={() => setOpenComment(true)}
          />
        </Badge>
        <Badge count={4}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        open={openComment}
        onClose={() => setOpenComment(false)}
      >
        <List
          dataSource={comments}
          pagination={{ pageSize: 8 }}
          renderItem={(item) => {
            return (
              <List.Item>
                <UserOutlined />
                <span className="username-comment">
                  {" "}
                  {item.user.username}:{" "}
                </span>
                {item.body}
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
};

export default Header;
