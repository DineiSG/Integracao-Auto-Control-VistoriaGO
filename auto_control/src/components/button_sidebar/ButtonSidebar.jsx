import '../sidebar/Sidebar.css';

function ButtonSidebar({ href, iconClass, text,classNameLink }) {
  return (

    <a className={classNameLink} href={href}>
      <i className={iconClass}></i>
      <span>{text}</span>
    </a>


  );
}

export default ButtonSidebar